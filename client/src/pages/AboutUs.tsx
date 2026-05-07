import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const coreCombines = [
  "Search Engine Optimization (SEO)",
  "Answer Engine Optimization (AEO)",
  "Generative Engine Optimization (GEO)",
  "AI Automation",
  "Topical Authority Systems",
  "Semantic Search Optimization",
  "Query Expansion Mapping",
  "AI-Assisted Content Systems",
  "Local Visibility Engineering",
  "Entity-Based Search Strategies",
];

const platforms = [
  {
    tag: "Parent Company",
    name: "Gadgetlesstech",
    subtitle: "The Parent Digital Marketing & AI Automation Company",
    description:
      "Gadgetlesstech is the foundation of the ecosystem. Originally launched as a digital marketing company specializing in SEO, content marketing, web design, branding, and local digital marketing, Gadgetlesstech has evolved into a modern AI-powered visibility company focused on helping businesses compete in the next generation of search.",
    mission: "Help businesses become the most visible and authoritative brand in their market.",
    bullets: [
      "SEO strategy",
      "AEO & GEO optimization",
      "Topical authority development",
      "Semantic content systems",
      "AI-powered marketing workflows",
      "Local business growth",
      "AI automation",
      "Multi-platform visibility",
      "Conversion-focused digital infrastructure",
    ],
    href: "/",
    cta: "Explore Gadgetlesstech",
  },
  {
    tag: "Creative & Automation Layer",
    name: "AI Suite",
    subtitle: "The Creative & Automation Layer",
    description:
      "AI Suite is the execution engine of the ecosystem. Built as a centralized AI platform, AI Suite gives businesses access to a growing collection of AI-powered creative and marketing tools from a single dashboard — removing friction from modern content creation and automation.",
    mission:
      "Instead of paying for dozens of disconnected tools, AI Suite centralizes the workflow into one ecosystem designed for marketers, agencies, creators, and local businesses.",
    bullets: [
      "AI image generation",
      "AI video generation",
      "Voice & audio tools",
      "Prompt engineering systems",
      "Social media creation",
      "Blog writing systems",
      "Media organization tools",
      "Subtitle & caption generation",
      "AI-assisted content workflows",
    ],
    href: "https://aisuite.gadgetlesstech.com",
    cta: "Explore AI Suite",
    external: true,
  },
  {
    tag: "Visibility Intelligence Layer",
    name: "Query Expansion System",
    subtitle: "The Visibility Intelligence Layer",
    description:
      "The Query Expansion System (QES) is the strategic foundation behind the ecosystem's search methodology. Traditional keyword research focuses on isolated keywords — QES expands beyond that. Rather than focusing on single keywords, QES builds entire semantic ecosystems around industries, services, and local markets.",
    mission:
      "Uncover what users are actually searching for, what AI engines are likely to reference, and how authority should be structured across a website ecosystem.",
    bullets: [
      "Semantic keyword relationships",
      "Intent mapping",
      "Topical expansion",
      "AI-assisted search modeling",
      "Entity relationships",
      "Conversational query patterns",
      "Search intent clustering",
      "BOFU / MOFU / TOFU mapping",
      "AI search behavior analysis",
    ],
    href: "https://queryexpansionsystem.com",
    cta: "Explore QES",
    external: true,
  },
  {
    tag: "Competitive Intelligence & AI Search Layer",
    name: "SEO4GEO",
    subtitle: "The Competitive Intelligence & AI Search Layer",
    description:
      "SEO4GEO represents the next evolution of the Gadgetlesstech ecosystem. Built around a simple but powerful idea — your competitors are ranking for what you're not — SEO4GEO identifies the gaps and closes them. It functions as part of the broader ecosystem, connecting strategy, AI tooling, content systems, and search visibility engineering into one unified framework.",
    mission:
      "Improve visibility across Google Search, AI-generated answers, local search systems, conversational AI interfaces, and future search environments.",
    bullets: [
      "Keyword gap analysis",
      "Semantic coverage gaps",
      "Topical authority weaknesses",
      "AI visibility opportunities",
      "Local search opportunities",
      "Entity deficiencies",
      "AI-powered audits",
      "Competitor visibility analysis",
      "Voice-assisted interaction systems",
    ],
    href: "/audit",
    cta: "Run a Free Audit",
  },
];

const philosophyPoints = [
  "Authority building",
  "Semantic coverage",
  "AI readability",
  "Search intent mapping",
  "Entity development",
  "Multi-platform visibility",
  "Structured data systems",
  "Scalable AI-assisted workflows",
];

const futurePoints = [
  "AI-generated answers",
  "Conversational search interfaces",
  "AI assistants",
  "Voice search",
  "Direct recommendations",
  "Summarized search results",
];

export default function AboutUs() {
  return (
    <div className="bg-black min-h-screen text-white">

      {/* Hero */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[12px] mb-6 flex items-center">
              <div className="w-12 h-px bg-cyan-400/30 mr-4" />
              The Ecosystem
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] mb-8">
              About the Gadgetlesstech <span className="text-cyan-400">Ecosystem</span>
            </h1>
            <p className="text-gray-400 text-lg font-medium max-w-3xl leading-relaxed mb-6">
              The Gadgetlesstech ecosystem was built to solve a major shift happening in digital marketing.
            </p>
            <div className="border-l-2 border-cyan-400/40 pl-6 mb-10">
              <p className="text-white text-xl font-black uppercase tracking-tight italic mb-1">Search is no longer just about ranking websites.</p>
              <p className="text-cyan-400 text-xl font-black uppercase tracking-tight italic">It's about becoming the answer.</p>
            </div>
            <p className="text-gray-400 text-base font-medium max-w-3xl leading-relaxed">
              As AI-powered search engines, conversational interfaces, and generative search experiences continue to evolve, businesses need more than traditional SEO. They need visibility across Google Search, AI-generated answers, local discovery systems, voice search, and multi-platform search behavior.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Combines */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[12px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-10">At Its Core, the Ecosystem Combines</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {coreCombines.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-gray-300 text-sm font-bold uppercase tracking-wider">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm font-medium mt-10 max-w-2xl leading-relaxed">
              The ecosystem is designed to help businesses dominate modern search visibility across traditional search engines and AI-driven search environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Four Platforms */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
            <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[12px] mb-4 block">The Four Core Platforms</span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white">
              One Ecosystem. <span className="text-cyan-400">Four Layers.</span>
            </h2>
          </motion.div>

          <div className="space-y-16">
            {platforms.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 hover:border-cyan-500/20 transition-all"
              >
                <span className="text-cyan-400 font-black uppercase tracking-[0.25em] text-[11px] mb-4 block">{p.tag}</span>
                <h3 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-white mb-2">{p.name}</h3>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-8">{p.subtitle}</p>

                <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 max-w-3xl">{p.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {p.bullets.map((b, j) => (
                    <div key={j} className="flex items-center gap-2 py-2">
                      <div className="w-1 h-4 bg-cyan-400/40 rounded-full shrink-0" />
                      <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{b}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/5 pt-6 flex items-start justify-between flex-wrap gap-4">
                  <p className="text-white/60 text-sm font-medium italic max-w-xl">"{p.mission}"</p>
                  {p.external ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors shrink-0"
                    >
                      {p.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      to={p.href}
                      className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors shrink-0"
                    >
                      {p.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Philosophy */}
      <section className="py-24 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[12px] mb-6 block">The Ecosystem Philosophy</span>
              <h2 className="font-display text-4xl font-black uppercase tracking-tighter italic text-white mb-6">
                Modern Visibility is <span className="text-cyan-400">Multi-Platform</span>
              </h2>
              <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6">
                The Gadgetlesstech ecosystem is built around a core belief: modern visibility is no longer isolated to Google rankings alone.
              </p>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                Businesses now need visibility across search engines, AI answer engines, map systems, conversational search, voice search, social discovery, and entity-driven search experiences. This requires a different type of strategy — one built on authority, semantic coverage, and AI readability rather than disconnected tactics.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-3">
              {philosophyPoints.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-gray-300 text-sm font-bold uppercase tracking-wider">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future of Search */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[12px] mb-6 block">The Future of Search</span>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-6">
              Search Behavior Is <span className="text-cyan-400">Rapidly Changing</span>
            </h2>
            <p className="text-gray-400 text-sm font-medium max-w-2xl mx-auto leading-relaxed">
              Users are increasingly relying on AI-generated answers and conversational interfaces. Modern search optimization now extends beyond ranking pages — it includes becoming a trusted source referenced by AI systems themselves.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
            {futurePoints.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i }}
                className="p-5 bg-white/5 border border-white/5 rounded-2xl text-center hover:border-cyan-500/30 transition-all"
              >
                <span className="text-gray-300 text-xs font-black uppercase tracking-wider">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-12 bg-white/[0.03] border border-white/10 rounded-3xl"
          >
            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-2xl mx-auto mb-8">
              The Gadgetlesstech ecosystem was created to help businesses adapt to that shift early — combining AI automation, semantic SEO, topical authority, query expansion mapping, GEO/AEO optimization, and scalable content systems into a modern framework designed for the evolving future of search.
            </p>
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 px-10 py-4 bg-cyan-400 text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-white transition-all shadow-[0_0_30px_rgba(0,184,219,0.3)]"
            >
              Run Your Free Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
