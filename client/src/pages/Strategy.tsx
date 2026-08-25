import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, Shield, Zap, Globe, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Strategy() {
  return (
    <div className="pt-32 pb-32 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-32 pt-12">
          <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[12px] mb-8 block flex items-center">
            <div className="w-12 h-px bg-cyan-400/30 mr-4"/>
            Proprietary Methodology
          </span>
          <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter mb-12 italic uppercase leading-[0.9] text-white">
            THE <span className="text-cyan-400">GADGETLESSTECH</span><br/>
            RANKING <span className="text-white/20">SYSTEM</span>™
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-medium max-w-3xl">
            We don't just target one keyword. We build <span className="text-white font-bold underline decoration-cyan-500/30 underline-offset-4">Authority Systems</span> that make you show up for hundreds of different ways people search for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-48">
          <div className="space-y-16">
            <div className="flex gap-8 group">
              <div className="w-16 h-16 bg-black border border-cyan-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all">
                <Cpu className="text-cyan-400 w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display text-3xl font-black mb-4 uppercase tracking-tighter italic text-white">01. Keyword Mapping Layer</h3>
                <p className="text-gray-400 leading-relaxed font-medium">
                  Covers thousands of search variations through advanced phrase stacking and natural embedding. We don't just target keywords; we target search intent clusters.
                </p>
              </div>
            </div>
            <div className="flex gap-8 group">
              <div className="w-16 h-16 bg-black border border-cyan-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all">
                <Globe className="text-cyan-400 w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display text-3xl font-black mb-4 uppercase tracking-tighter italic text-white">02. Topical Authority Layer</h3>
                <p className="text-gray-400 leading-relaxed font-medium">
                  Own entire subject areas. By building deep content silos and establishing entity relationships, we signal absolute authority to search engines.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-16">
            <div className="flex gap-8 group">
              <div className="w-16 h-16 bg-black border border-cyan-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all">
                <Shield className="text-cyan-400 w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display text-3xl font-black mb-4 uppercase tracking-tighter italic text-white">03. Page Authority Layer</h3>
                <p className="text-gray-400 leading-relaxed font-medium">
                  Each page ranks independently. We optimize individual pages with high-authority signals and engagement triggers that Google prioritizes.
                </p>
              </div>
            </div>
            <div className="flex gap-8 group">
              <div className="w-16 h-16 bg-black border border-cyan-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all">
                <Zap className="text-cyan-400 w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display text-3xl font-black mb-4 uppercase tracking-tighter italic text-white">04. Query Expansion Layer</h3>
                <p className="text-gray-400 leading-relaxed font-medium">
                  Capture long-tail and AI queries. Using our proprietary PAA (People Also Ask) fan-out strategy, we dominate the search results for related queries.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-[32px] border border-white/10 p-10 md:p-20 mb-48 relative overflow-hidden backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 relative z-10">
            <div className="lg:col-span-1">
              <h2 className="font-display text-4xl font-black mb-8 uppercase tracking-tighter text-white italic">Why it works today</h2>
              <p className="text-gray-400 mb-10 leading-relaxed font-medium">
                Traditional SEO is dead. Backlinks are no longer the primary signal. In 2026, authority is built through semantic relevance and entity relationships.
              </p>
              <ul className="space-y-6">
                {["Semantic Authority", "Query Expansion", "Entity Stacking", "Intent Mapping"].map((item) => (
                  <li key={item} className="flex items-center text-[12px] font-black uppercase tracking-[0.2em] text-white">
                    <CheckCircle2 className="mr-4 w-5 h-5 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-10 bg-black/40 rounded-2xl border border-white/5 hover:border-cyan-500/50 transition-all">
                <h4 className="font-black text-white uppercase tracking-widest text-xs mb-6">Local Domination</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  Dominate the map pack and local organic search. We connect your business to the hyper-local entities that trigger ranking signals.
                </p>
              </div>
              <div className="p-10 bg-black/40 rounded-2xl border border-white/5 hover:border-cyan-500/50 transition-all">
                <h4 className="font-black text-white uppercase tracking-widest text-xs mb-6">National Scale</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  Scale your authority category-wide. Our silo architecture allows you to compete for the highest volume national keywords in your industry.
                </p>
              </div>
              <div className="p-10 bg-black/40 rounded-2xl border border-white/5 hover:border-cyan-500/50 transition-all">
                <h4 className="font-black text-white uppercase tracking-widest text-xs mb-6">AI Search Ready</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  Optimized for AEO (Answer Engine Optimization). We ensure your brand is the primary source for AI-generated search summaries.
                </p>
              </div>
              <div className="p-10 bg-black/40 rounded-2xl border border-white/5 hover:border-cyan-500/50 transition-all">
                <h4 className="font-black text-white uppercase tracking-widest text-xs mb-6">Conversion Focused</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  We don't just drive traffic; we drive conversions by mapping search intent directly to your transactional funnels.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="text-center relative">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block p-1 bg-gradient-to-r from-cyan-500 to-white/10 rounded-xl"
          >
            <div className="bg-black rounded-lg px-20 py-16">
              <h2 className="font-display text-4xl md:text-5xl font-black mb-10 text-white uppercase tracking-tighter italic">Ready to scale?</h2>
              <Button
                onClick={() => window.dispatchEvent(new CustomEvent('open-calendar'))}
                size="lg"
                className="bg-[#00b8db] text-black hover:bg-white px-16 py-10 rounded-md text-sm font-black uppercase tracking-widest shadow-[0_0_40px_rgba(0,184,219,0.4)] transition-all"
              >
                Book Your Custom Blueprint <ArrowRight className="ml-4 w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
