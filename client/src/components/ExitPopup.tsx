import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, ArrowRight, Search, BarChart3, Target, Zap } from "lucide-react";

const STORAGE_KEY = "seo4geo_visitor_type";
const DISMISSED_KEY = "seo4geo_popup_dismissed";
const N8N_WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL || "";

function isReturning(): boolean {
  return localStorage.getItem(STORAGE_KEY) === "returning";
}

function markReturning() {
  localStorage.setItem(STORAGE_KEY, "returning");
}

function wasDismissedToday(): boolean {
  const ts = localStorage.getItem(DISMISSED_KEY);
  if (!ts) return false;
  return Date.now() - Number(ts) < 24 * 60 * 60 * 1000;
}

function markDismissed() {
  localStorage.setItem(DISMISSED_KEY, String(Date.now()));
}

const bullets = [
  "See the exact keywords competitors rank for that you don't",
  "Uncover local search gaps in under 60 seconds",
  "Get an AI-powered action plan to close the gap",
  "Powered by the Gadgetlesstech Ranking System™",
];

const visuals = [
  { icon: Search, label: "Keyword Gap Report", color: "text-cyan-400" },
  { icon: BarChart3, label: "Competitor Rankings", color: "text-blue-400" },
  { icon: Target, label: "Local Visibility Score", color: "text-emerald-400" },
  { icon: Zap, label: "AI Action Plan", color: "text-purple-400" },
];

export function ExitPopup() {
  const [visible, setVisible] = useState(false);
  const [returning, setReturning] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const open = useCallback(() => {
    if (wasDismissedToday()) return;
    const ret = isReturning();
    setReturning(ret);
    setVisible(true);
    markReturning();
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    markDismissed();
  }, []);

  useEffect(() => {
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) open();
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [open]);


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    if (visible) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, close]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      if (N8N_WEBHOOK) {
        await fetch(N8N_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, website, source: "seo4geo_exit_popup" }),
        });
      }
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
    markDismissed();
  };

  const openCalendar = () => {
    close();
    window.dispatchEvent(new CustomEvent("open-calendar"));
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-4xl bg-[#0a0f1a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,184,219,0.15)]">

              <button
                onClick={close}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">

                {/* LEFT */}
                <div className="relative bg-gradient-to-br from-[#030712] via-[#0d1a2e] to-[#0a0f1a] p-10 flex flex-col justify-between min-h-[480px] overflow-hidden">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] translate-x-1/2 translate-y-1/2" />

                  <div className="relative z-10">
                    <p className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-xs mb-4">SEO4GEO — Gadgetlesstech Ranking System™</p>
                    <h2 className="font-display text-3xl font-black uppercase tracking-tighter leading-tight text-white mb-3">
                      Before you go — see exactly where your competitors are beating you.
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Run a free keyword gap audit and get your personalized action plan before you leave.
                    </p>
                  </div>

                  <div className="relative z-10 grid grid-cols-2 gap-3 mt-8">
                    {visuals.map((v) => (
                      <div key={v.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex items-center gap-2">
                        <v.icon className={`w-4 h-4 shrink-0 ${v.color}`} />
                        <span className="text-white/60 text-[11px] font-medium leading-tight">{v.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="relative z-10 mt-6 space-y-2">
                    {bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-white/70 text-xs font-medium">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="p-10 flex flex-col justify-center">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-cyan-400" />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-3">You're on the list.</h3>
                      <p className="text-white/50 text-sm mb-8">Check your inbox. Your keyword gaps won't close themselves.</p>
                      <button onClick={close} className="text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors">
                        Close
                      </button>
                    </motion.div>

                  ) : returning ? (
                    <div>
                      <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">You Already Know the Gap</p>
                      <h3 className="font-display text-3xl font-black uppercase tracking-tighter text-white mb-4">
                        Ready to close it with expert help?
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-8">
                        Let's map your exact keyword gaps, local visibility score, and a custom ranking strategy — live on a call.
                      </p>
                      <button
                        onClick={openCalendar}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#00b8db] text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-white transition-all"
                      >
                        Book Your Free Strategy Call <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setReturning(false)}
                        className="w-full mt-4 py-3 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                      >
                        Get the free audit instead
                      </button>
                    </div>

                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">Free Keyword Gap Audit</p>
                        <h3 className="font-display text-2xl font-black uppercase tracking-tighter text-white mb-2">
                          See Your Gaps Before You Go
                        </h3>
                        <p className="text-white/40 text-xs mb-6">No spam. No fluff. Just your real keyword gaps.</p>
                      </div>

                      <input
                        type="text"
                        placeholder="First name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Email address *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                      <input
                        type="url"
                        placeholder="Website (optional)"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />

                      <button
                        type="submit"
                        disabled={loading || !email}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#00b8db] text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Sending…" : "Get My Free Audit"} <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="pt-2 border-t border-white/5">
                        <p className="text-white/30 text-xs text-center mb-3">Already serious about ranking?</p>
                        <button
                          type="button"
                          onClick={openCalendar}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-white/50 hover:border-cyan-500/40 hover:text-cyan-400 font-bold uppercase tracking-widest text-xs rounded-xl transition-all"
                        >
                          Book Your Free Strategy Call
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
