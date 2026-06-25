import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, MicOff, X, MessageSquare, Loader2, Calendar as CalendarIcon, Search, Send } from "lucide-react";
import { GoogleGenAI, Modality } from "@google/genai";
import CalendarWidget from "./CalendarWidget";
import { float32ToInt16, base64ToFloat32, AudioQueue, arrayBufferToBase64 } from "@/src/lib/audio-utils";

const GREETING =
  "Hey! I'm your Gadgetlesstech SEO Assistant. Ask me anything about ranking, keywords, or local SEO — or click the calendar icon to book a strategy call.";

const SYSTEM_INSTRUCTION =
  "You are the Gadgetlesstech SEO Assistant. You help users understand the Gadgetlesstech Ranking System™, which includes Keyword Compression, Topical Authority, Page Authority, and Query Expansion. Be professional, authoritative, and concise — keep spoken answers under 3 sentences. If the user wants to book a call or schedule a meeting, let them know they can click the calendar icon in this chat.";

type Msg = { role: "user" | "model"; text: string };

export default function VoiceChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([{ role: "model", text: GREETING }]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const liveSessionRef = useRef<any>(null);
  const audioQueueRef = useRef<AudioQueue | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenCalendar = () => { setIsOpen(true); setShowCalendar(true); };
    const handleOpenVoiceChat = () => { setIsOpen(true); setShowCalendar(false); };
    window.addEventListener("open-calendar", handleOpenCalendar);
    window.addEventListener("open-voice-chat", handleOpenVoiceChat);
    return () => {
      window.removeEventListener("open-calendar", handleOpenCalendar);
      window.removeEventListener("open-voice-chat", handleOpenVoiceChat);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const stopVoiceChat = useCallback(() => {
    if (liveSessionRef.current) {
      try { liveSessionRef.current.close(); } catch (_) {}
      liveSessionRef.current = null;
    }
    if (audioQueueRef.current) {
      audioQueueRef.current.stop();
      audioQueueRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    setIsLoading(false);
    setIsListening(false);
    setIsVoiceMode(false);
  }, []);

  useEffect(() => { return () => stopVoiceChat(); }, [stopVoiceChat]);

  const startVoiceChat = async () => {
    try {
      setIsLoading(true);

      const tokenRes = await fetch("/api/chat/token");
      const { token, error: tokenErr } = await tokenRes.json();
      if (!token) throw new Error(tokenErr || "Could not get voice session token");

      const ai = new GoogleGenAI({ apiKey: token, httpOptions: { apiVersion: "v1alpha" } });
      audioQueueRef.current = new AudioQueue(24000);

      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        callbacks: {
          onopen: async () => {
            setIsListening(true);
            setIsLoading(false);
            setIsVoiceMode(true);

            try {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
              micStreamRef.current = stream;

              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
              audioContextRef.current = audioContext;

              if (audioContext.state === "suspended") await audioContext.resume();

              const source = audioContext.createMediaStreamSource(stream);
              const processor = audioContext.createScriptProcessor(4096, 1, 1);
              processorRef.current = processor;

              source.connect(processor);
              processor.connect(audioContext.destination);

              processor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const pcmData = float32ToInt16(inputData);
                const base64Data = arrayBufferToBase64(pcmData.buffer);
                if (liveSessionRef.current) {
                  liveSessionRef.current.sendRealtimeInput({
                    audio: { data: base64Data, mimeType: "audio/pcm;rate=16000" },
                  });
                }
              };
            } catch (micError: any) {
              const text =
                micError.name === "NotAllowedError" || micError.name === "PermissionDeniedError"
                  ? "Microphone access denied. Please allow mic permissions and try again."
                  : `Mic error: ${micError.message}`;
              setMessages(prev => [...prev, { role: "model", text }]);
              stopVoiceChat();
            }
          },

          onmessage: (message: any) => {
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData && audioQueueRef.current) {
              audioQueueRef.current.enqueue(base64ToFloat32(audioData));
            }

            const modelText = message.serverContent?.outputTranscription?.text;
            if (modelText) {
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "model" && last.text.startsWith("...")) {
                  return [...prev.slice(0, -1), { role: "model", text: modelText }];
                }
                return [...prev, { role: "model", text: modelText }];
              });
            }

            const userText = message.serverContent?.inputTranscription?.text;
            if (userText) {
              setMessages(prev => [...prev, { role: "user", text: userText }]);
            }

            if (message.serverContent?.interrupted && audioQueueRef.current) {
              audioQueueRef.current.stop();
              audioQueueRef.current = new AudioQueue(24000);
            }
          },

          onerror: (err: any) => {
            setMessages(prev => [...prev, { role: "model", text: `Voice error: ${String(err)}` }]);
            stopVoiceChat();
          },

          onclose: () => {
            stopVoiceChat();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } } },
          systemInstruction: SYSTEM_INSTRUCTION,
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        },
      });

      liveSessionRef.current = session;
    } catch (error: any) {
      console.error("Failed to start voice chat:", error);
      setMessages(prev => [...prev, { role: "model", text: `Connection error: ${error?.message ?? "Unknown error"}` }]);
      stopVoiceChat();
    }
  };

  const toggleVoiceMode = () => {
    if (isVoiceMode) stopVoiceChat();
    else startVoiceChat();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.filter(m => m.text !== GREETING);
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, message: userMessage }),
      });
      const data = await res.json();
      const text = data.text || "I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: "model", text }]);

      if (text.toLowerCase().includes("calendar") || text.toLowerCase().includes("schedule")) {
        setShowCalendar(true);
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { role: "model", text: "Sorry, I'm having trouble connecting. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(p => !p)}
        className="fixed bottom-8 right-8 bg-cyan-500 text-black rounded-full shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center justify-center z-50 hover:bg-white transition-all active:scale-90 px-5 py-4 gap-2"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 shrink-0" />
            <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap">Chat Live with AI</span>
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-28 right-8 w-[400px] h-[600px] bg-black rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col overflow-hidden z-50 backdrop-blur-xl"
          >
            <div className="p-6 bg-black text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  <Search className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xs uppercase tracking-[0.2em] leading-none mb-1">SEO Assistant</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isVoiceMode ? "bg-red-400 animate-pulse" : "bg-cyan-400 animate-pulse"}`} />
                    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-black">
                      {isVoiceMode ? "Voice Mode Active" : "Online"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleVoiceMode}
                  title={isVoiceMode ? "Stop voice chat" : "Start voice chat"}
                  className={`p-2 rounded-full transition-colors ${isVoiceMode ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                >
                  {isVoiceMode ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
                <button onClick={() => setShowCalendar(s => !s)} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black/95 scrollbar-hide">
              {showCalendar ? (
                <div className="h-full"><CalendarWidget onClose={() => setShowCalendar(false)} /></div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] p-4 rounded-xl text-xs font-medium leading-relaxed ${
                        msg.role === "user"
                          ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                          : "bg-white/5 text-gray-300 border border-white/5"
                      }`}>{msg.text}</div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {!showCalendar && (
              <div className="p-6 bg-black border-t border-white/10">
                {isVoiceMode ? (
                  <div className="flex flex-col items-center justify-center py-2 space-y-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
                      <div className="relative bg-red-500 text-white p-4 rounded-full">
                        <Mic className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-[12px] uppercase tracking-widest text-gray-500 animate-pulse">Listening...</p>
                    <button onClick={stopVoiceChat} className="text-[12px] uppercase tracking-widest text-gray-600 hover:text-white transition-colors">
                      Switch to Text
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center space-x-3">
                    <div className="flex-1 bg-white/5 border border-white/5 rounded-lg px-4 py-3 flex items-center transition-all focus-within:border-cyan-500/50">
                      <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type your query..."
                        className="bg-transparent border-none focus:ring-0 text-[11px] font-medium flex-1 text-white placeholder:text-gray-700"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-all border bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-white flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
