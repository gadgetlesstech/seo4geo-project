import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Modality } from '@google/genai';

const SYSTEM_INSTRUCTION =
  'You are the Gadgetlesstech SEO Assistant. You help users understand the Gadgetlesstech Ranking System™, which includes Keyword Compression, Topical Authority, Page Authority, and Query Expansion. Be professional, authoritative, and concise — keep spoken answers under 3 sentences. If the user wants to book a call or schedule a meeting, let them know they can click the calendar icon in this chat.';

export function setupLiveProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (request, socket, head) => {
    if (request.url === '/api/chat/live') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('connection', async (clientWs) => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    let geminiSession = null;

    const send = (obj) => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify(obj));
      }
    };

    const cleanup = () => {
      if (geminiSession) {
        try { geminiSession.close(); } catch (_) {}
        geminiSession = null;
      }
    };

    try {
      geminiSession = await ai.live.connect({
        model: 'gemini-2.0-flash-live-preview-04-09',
        callbacks: {
          onopen: () => send({ type: 'ready' }),

          onmessage: (message) => {
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData) send({ type: 'audio', data: audioData });

            const modelText = message.serverContent?.outputTranscription?.text;
            if (modelText) send({ type: 'model_transcript', text: modelText });

            const userText = message.serverContent?.inputTranscription?.text;
            if (userText) send({ type: 'user_transcript', text: userText });

            if (message.serverContent?.interrupted) send({ type: 'interrupted' });
          },

          onerror: (err) => {
            console.error('Gemini Live error:', err);
            send({ type: 'error', message: String(err) });
            clientWs.close();
          },

          onclose: () => {
            if (clientWs.readyState === WebSocket.OPEN) clientWs.close();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Aoede' } } },
          systemInstruction: SYSTEM_INSTRUCTION,
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        },
      });
    } catch (err) {
      console.error('Failed to connect to Gemini Live:', err);
      send({ type: 'error', message: err.message });
      clientWs.close();
      return;
    }

    clientWs.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'audio' && geminiSession) {
          geminiSession.sendRealtimeInput({
            audio: { data: msg.data, mimeType: 'audio/pcm;rate=16000' },
          });
        }
      } catch (_) {}
    });

    clientWs.on('close', cleanup);
    clientWs.on('error', cleanup);
  });
}
