import { motion } from "motion/react";
import { ArrowRight, Layers, Zap, Target, Search, Calendar, MessageSquare } from "lucide-react";
import logo from "@/src/assets/logo.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const frameworkLayers = [
  {
    id: "01",
    title: "Keyword Compression Layer",
    description: "Cover thousands of search variations through phrase stacking and natural embedding. Maximize visibility with minimal content bloat.",
    icon: <Layers className="w-6 h-6 text-cyan-400" />,
    color: "bg-cyan-500/10 border-cyan-500/40"
  },
  {
    id: "02",
    title: "Topical Authority Layer",
    description: "Own entire subject areas through semantic saturation and silo architecture. Become the definitive source in your niche.",
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
    color: "bg-cyan-500/10 border-cyan-500/40"
  },
  {
    id: "03",
    title: "Page Authority Layer",
    description: "Optimize individual pages to gain independent ranking power using on-page authority signals and engagement triggers.",
    icon: <Target className="w-6 h-6 text-cyan-400" />,
    color: "bg-cyan-500/10 border-cyan-500/40"
  },
  {
    id: "04",
    title: "Query Expansion Layer",
    description: "Capture long-tail and AI-driven queries using 'People Also Ask' strategies and query fan-out techniques.",
    icon: <Search className="w-6 h-6 text-cyan-400" />,
    color: "bg-cyan-500/10 border-cyan-500/40"
  }
];

const clusterTopics = [
  { title: "Rank Without Backlinks", slug: "rank-without-backlinks" },
  { title: "Compact Keyword Strategy", slug: "compact-keyword-strategy" },
  { title: "Page-Level SEO Signals", slug: "page-level-seo-signals" },
  { title: "Topical Authority SEO", slug: "topical-authority-seo" },
  { title: "Search Intent Mapping", slug: "search-intent-mapping" },
  { title: "Semantic SEO", slug: "semantic-seo" },
  { title: "Entity-Based SEO", slug: "entity-based-seo" },
  { title: "Query Expansion Strategy", slug: "query-expansion-strategy" },
  { title: "On-Page vs Authority", slug: "on-page-vs-authority" },
  { title: "Ranking System 2026", slug: "ranking-system-2026" }
];

const ecosystem = [
  {
    asset: "QES",
    label: "queryexpansionsystem.com",
    url: "https://queryexpansionsystem.com",
    role: "The Why",
    description: "Educates on query expansion as a concept and philosophy. Books strategy calls.",
    current: false,
  },
  {
    asset: "seo4geo",
    label: "You are here",
    url: null,
    role: "The What",
    description: "Shows your actual keyword gaps using the QES methodology. Proof over promise.",
    current: true,
  },
  {
    asset: "AI Suite",
    label: "aisuite.gadgetlesstech.com",
    url: "https://aisuite.gadgetlesstech.com",
    role: "The How",
    description: "Tools to start acting on your gaps immediately — without waiting on an agency.",
    current: false,
  },
  {
    asset: "Gadgetlesstech",
    label: "gadgetlesstech.com",
    url: "https://gadgetlesstech.com",
    role: "The Who",
    description: "The team that executes the full Ranking System™ for you, end to end.",
    current: false,
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-8"
            >
              <img src={logo} alt="Gadgetlesstech" className="w-32 h-32 object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-8"
            >
              <span className="text-[12px] font-black uppercase tracking-[0.3em] text-cyan-400/80 mb-6 flex items-center justify-center">
                <div className="w-10 h-[1px] bg-cyan-400/30 mr-4"/>
                See Exactly Where You're Losing
                <div className="w-10 h-[1px] bg-cyan-400/30 ml-4"/>
              </span>
              <h1 className="font-display text-5xl md:text-8xl font-black tracking-tight text-white mb-8 leading-[0.9]">
                YOUR COMPETITORS ARE<br /><span className="text-cyan-400 underline decoration-8 decoration-cyan-500/20 underline-offset-8 italic">RANKING FOR WHAT YOU'RE NOT.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-medium" style={{ lineHeight: "1.9" }}>
                SEO4GEO surfaces the exact keywords your competitors rank for that you don't — powered by the Gadgetlesstech Ranking System™.<br />
                Run a free audit and see your gaps in under 60 seconds.
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/audit">
                <Button
                  size="lg"
                  className="bg-[#00b8db] text-black hover:bg-white px-10 py-8 rounded-md text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,184,219,0.3)] transition-all active:scale-95 flex items-center"
                >
                  Get Your Free Audit <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
              <Button
                onClick={() => window.dispatchEvent(new CustomEvent('open-calendar'))}
                variant="outline"
                size="lg"
                className="border-[#00b8db]/50 text-white hover:bg-[#00b8db]/10 px-10 py-8 rounded-md text-sm font-black uppercase tracking-widest flex items-center"
              >
                Book a Strategy Call <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
              <a href="https://queryexpansionsystem.com/" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-10 py-8 rounded-md text-sm font-black uppercase tracking-widest transition-all flex items-center"
                >
                  Download Free Blueprint <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </a>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 text-[12px] font-black uppercase tracking-[0.2em] text-gray-500">
              <span className="flex items-center"><div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 shadow-[0_0_8px_rgba(6,182,212,0.8)]"/> See your keyword gaps instantly</span>
              <span className="flex items-center"><div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 shadow-[0_0_8px_rgba(6,182,212,0.8)]"/> Compare against local competitors</span>
              <span className="flex items-center"><div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 shadow-[0_0_8px_rgba(6,182,212,0.8)]"/> Get an AI-powered action plan</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </section>

      {/* ── Ecosystem ── */}
      <section className="py-32 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[12px] mb-6 flex items-center justify-center">
              <div className="w-12 h-px bg-cyan-400/30 mr-4"/>
              The Full Picture
              <div className="w-12 h-px bg-cyan-400/30 ml-4"/>
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase italic">
              WHERE <span className="text-cyan-400">SEO4GEO</span> FITS
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">
              seo4geo isn't a standalone tool — it's the proof layer inside a complete ranking ecosystem built by Gadgetlesstech.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-y-1/2 pointer-events-none" />

            {ecosystem.map((item, idx) => (
              <motion.div
                key={item.asset}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center px-6 py-10"
              >
                {/* connector dot */}
                <div className={`absolute top-1/2 left-0 w-px h-full -translate-y-1/2 ${idx === 0 ? "hidden" : "hidden md:block bg-white/5"}`} />

                {/* role badge */}
                <div className={`mb-6 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${
                  item.current
                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                    : "bg-white/5 border-white/10 text-gray-500"
                }`}>
                  {item.role}
                </div>

                {/* card */}
                <div
                  onClick={() => item.url && window.open(item.url, "_blank", "noopener,noreferrer")}
                  className={`w-full rounded-2xl border p-8 transition-all relative group ${
                    item.current
                      ? "bg-cyan-500/5 border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.1)]"
                      : "bg-white/[0.02] border-white/5 cursor-pointer hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]"
                  }`}
                >
                  {item.current && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                      You Are Here
                    </div>
                  )}
                  <h3 className={`font-display text-2xl font-black uppercase tracking-tighter mb-3 ${item.current ? "text-white" : "text-gray-400"}`}>
                    {item.asset}
                  </h3>
                  <p className={`text-[13px] font-medium leading-relaxed ${item.current ? "text-gray-300" : "text-gray-600"}`}>
                    {item.description}
                  </p>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-[11px] font-black uppercase tracking-widest text-gray-600 hover:text-cyan-400 transition-colors block"
                    >
                      {item.label} ↗
                    </a>
                  ) : (
                    <p className="mt-4 text-[11px] font-black uppercase tracking-widest text-cyan-400">
                      {item.label}
                    </p>
                  )}
                </div>

                {/* arrow between cards */}
                {idx < ecosystem.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-cyan-500/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Framework ── */}
      <section id="framework" className="py-32 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[12px] mb-6 flex items-center justify-center">
              <div className="w-12 h-px bg-cyan-400/30 mr-4"/>
              The Proprietary Stack
              <div className="w-12 h-px bg-cyan-400/30 ml-4"/>
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase italic">
              THE GADGETLESSTECH <span className="text-cyan-400">SEO FRAMEWORK</span>
            </h2>
            <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
              Our proprietary 4-layer methodology designed to dominate modern search engines and AI-driven queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {frameworkLayers.map((layer, idx) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-black border-white/5 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] group overflow-hidden">
                  <CardHeader className="relative z-10">
                    <div className={`w-14 h-14 ${layer.color} border rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]`}>
                      {layer.icon}
                    </div>
                    <div className="text-[12px] font-black text-gray-700 mb-2 uppercase tracking-[0.2em]">{layer.id}</div>
                    <CardTitle className="font-display text-2xl font-black italic uppercase tracking-tighter text-white">{layer.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-500 text-[14px] leading-relaxed font-medium">
                      {layer.description}
                    </p>
                  </CardContent>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-[100%] transition-all group-hover:bg-cyan-500/10" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clusters ── */}
      <section id="clusters" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-red-500 font-black uppercase tracking-[0.3em] text-[12px] mb-6 block">Deep Insights</span>
            <h2 className="font-display text-4xl md:text-5xl font-black mb-6 tracking-tighter text-white uppercase italic">THE <span className="text-cyan-400">SUPPORTING</span> CLUSTER</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">
              Deep dives into the specific methodologies that power the Authority Stack SEO System™.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {clusterTopics.map((topic) => (
              <Link key={topic.slug} to={`/cluster/${topic.slug}`}>
                <motion.div
                  whileHover={{ y: -5, borderColor: "rgba(6,182,212,0.5)" }}
                  className="p-8 bg-white/5 border border-white/5 rounded-2xl hover:bg-black transition-all h-full flex flex-col justify-between group"
                >
                  <h3 className="font-display font-black text-white uppercase tracking-tighter leading-tight mb-6">
                    {topic.title}
                  </h3>
                  <div className="flex items-center text-cyan-400 text-[12px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                    Read Report <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integration ── */}
      <section className="py-32 bg-black text-white overflow-hidden relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[12px] mb-8 block">Live System Integration</span>
              <h2 className="font-display text-5xl md:text-6xl font-black mb-10 leading-[0.9] uppercase italic">
                EXPERIENCE THE <span className="text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">G-RS LIVE</span> VOICE EXPANSION
              </h2>
              <p className="text-gray-400 text-lg mb-12 leading-relaxed font-medium">
                Interact with our query expansion system in real-time using voice. Ask about topical authority, keyword compression, or schedule a strategy session directly through our Google Calendar integration.
              </p>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <MessageSquare className="text-cyan-400 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-tighter text-lg mb-2">Real-time Voice Chat</h4>
                    <p className="text-sm text-gray-500 font-medium">Low-latency AI interaction for complex SEO strategy queries.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar className="text-cyan-400 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-tighter text-lg mb-2">Calendar Integration</h4>
                    <p className="text-sm text-gray-500 font-medium">Check availability and book sessions seamlessly with Google Calendar.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-black/60 backdrop-blur-xl rounded-[40px] p-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                    <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">Live System Active</span>
                  </div>
                  <div className="px-4 py-1.5 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-white border border-white/5">v4.8.0</div>
                </div>
                <div className="space-y-6 mb-12">
                  <div className="h-2 bg-cyan-500/20 rounded-full w-3/4" />
                  <div className="h-2 bg-white/5 rounded-full w-1/2" />
                  <div className="h-2 bg-cyan-500/10 rounded-full w-5/6" />
                </div>
                <Button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-voice-chat'))}
                  className="w-full bg-cyan-500 text-black hover:bg-white py-8 rounded-xl font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all"
                >
                  Start Voice Session
                </Button>
                <div className="absolute -bottom-10 left-0 right-0 h-40 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
