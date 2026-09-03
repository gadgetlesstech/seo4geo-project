import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowDown,
  Check,
  ChevronDown,
  Play,
  Search,
  Users,
  Phone,
  BarChart3,
  TrendingUp,
  Calendar,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import videoThumbnail from "@/src/assets/roofing-ranking-gap-showdown.png";
import auditScreenshot from "@/src/assets/audit-report-screenshot.png";

const obviousKeywords = ["roofing company", "roofer near me", "roof repair", "roof replacement"];

const campaignMetrics = [
  {
    label: "Ranking Search Queries",
    before: "186",
    after: "1,247",
    icon: <Search className="w-4 h-4 text-cyan-400" />,
  },
  {
    label: "Organic Visitors / Month",
    before: "742",
    after: "2,436",
    icon: <Users className="w-4 h-4 text-cyan-400" />,
  },
  {
    label: "Organic Calls & Leads / Month",
    before: "14",
    after: "47",
    icon: <Phone className="w-4 h-4 text-cyan-400" />,
  },
  {
    label: "Top 10 Rankings",
    before: "38",
    after: "214",
    icon: <BarChart3 className="w-4 h-4 text-cyan-400" />,
  },
];

const campaignStats = [
  { value: "+570%", label: "More Ranking Queries", icon: <TrendingUp className="w-5 h-5 text-cyan-400" /> },
  { value: "+228%", label: "Organic Traffic", icon: <Users className="w-5 h-5 text-cyan-400" /> },
  { value: "+236%", label: "Organic Leads", icon: <Phone className="w-5 h-5 text-cyan-400" /> },
  { value: "6 Months", label: "To Achieve Results", icon: <Calendar className="w-5 h-5 text-cyan-400" /> },
];

const faqItems = [
  {
    q: "Is the analysis really free?",
    a: "Yes. There's no cost and no obligation to run your roofing search visibility analysis.",
  },
  {
    q: "Do I need to enter a credit card?",
    a: "No. We never ask for payment information to run your analysis.",
  },
  {
    q: "How long does it take?",
    a: "Just enter your website, service, and city to get started — the analysis runs automatically from there.",
  },
  {
    q: "What does SEO4GEO analyze?",
    a: "Your keyword rankings, competitor gaps, topical coverage, backlink profile, and visibility inside AI-powered search results — specific to your market.",
  },
  {
    q: "Do I need to be a Gadgetlesstech client?",
    a: "No. The analysis is free for any roofing company, whether or not you ever work with Gadgetlesstech.",
  },
  {
    q: "Will someone call me after I run the analysis?",
    a: "No sales calls. If you unlock full results with your email, you may receive a few relevant follow-up emails — nothing more.",
  },
  {
    q: "Does this work for roofing companies anywhere in the U.S.?",
    a: "Yes. The analysis works for any roofing company with a website, in any U.S. market.",
  },
  {
    q: "What happens after I get my results?",
    a: "You'll see exactly where competitors are outranking and out-covering you — and what to do about it first.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[12px] mb-6 flex items-center justify-center">
      <div className="w-12 h-px bg-cyan-400/30 mr-4" />
      {children}
      <div className="w-12 h-px bg-cyan-400/30 ml-4" />
    </span>
  );
}

export default function RoofingRankingGap() {
  const [heroUrl, setHeroUrl] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const heroFormRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleHeroSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const trimmed = heroUrl.trim();
    navigate(trimmed ? `/audit?url=${encodeURIComponent(trimmed)}` : "/audit");
  };

  const scrollToHeroInput = () => {
    document.getElementById("hero-url")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => document.getElementById("hero-url")?.focus(), 400);
  };

  useEffect(() => {
    const el = heroFormRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setShowStickyCta(!entry.isIntersecting), {
      rootMargin: "-80px 0px 0px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden bg-black">
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-black">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Eyebrow>Roofing Ranking Gap Challenge</Eyebrow>
            <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight text-white mb-8 leading-[1.05] uppercase italic">
              How Much Of The <span className="text-cyan-400">Roofing Search Market</span> Are You Missing?
            </h1>
            <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto font-medium" style={{ lineHeight: "1.8" }}>
              Enter your website to uncover search opportunities your competitors may be capturing that you're missing.
            </p>
          </motion.div>

          <form ref={heroFormRef} onSubmit={handleHeroSubmit} className="text-left mb-8">
            <label htmlFor="hero-url" className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3">
              Enter your roofing website
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="hero-url"
                type="url"
                value={heroUrl}
                onChange={(e) => setHeroUrl(e.target.value)}
                placeholder="https://yourroofingcompany.com"
                required
                className="flex-1 bg-black border border-white/15 rounded-lg px-5 py-5 text-white text-base font-medium placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/60 transition-colors"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-[#00b8db] text-black hover:bg-white px-8 py-8 rounded-lg text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,184,219,0.3)] transition-all active:scale-95 inline-flex items-center justify-center whitespace-nowrap"
              >
                Find My Ranking Gaps <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-black uppercase tracking-widest text-gray-500 mb-10">
            <span className="flex items-center">
              <Check className="w-4 h-4 text-cyan-400 mr-2" /> Free Analysis
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 text-cyan-400 mr-2" /> No Credit Card
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 text-cyan-400 mr-2" /> Your Website. Your Competitors. Your Gaps.
            </span>
          </div>

          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-600">
            SEO4GEO &mdash; Powered By The Gadgetlesstech Ranking System&trade;
          </p>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none" />
      </section>

      {/* ── What You Get (real product screenshot) ── */}
      <section className="relative py-16 bg-black border-t border-white/5 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(6,182,212,0.15)]">
            <img
              src={auditScreenshot}
              alt="A real SEO4GEO ranking gap report: coverage score, competitor comparison, and gap keyword list"
              className="w-full h-auto block"
              loading="eager"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-6 text-[12px] font-black uppercase tracking-widest text-gray-500">
            <span className="flex items-center"><Check className="w-4 h-4 text-cyan-400 mr-2" /> Your coverage score</span>
            <span className="flex items-center"><Check className="w-4 h-4 text-cyan-400 mr-2" /> Competitor comparison</span>
            <span className="flex items-center"><Check className="w-4 h-4 text-cyan-400 mr-2" /> Your actual gap keywords</span>
          </div>
        </div>
      </section>

      {/* ── Real Campaign Results (Fairfield County case study) ── */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Eyebrow>Real Roofing SEO Campaign</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic">
              What Happens When You <span className="text-cyan-400">Expand Search Coverage?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-black uppercase tracking-widest">
                  Fairfield County Roofing Campaign
                </span>
                <span className="text-gray-500 text-[11px] font-black uppercase tracking-widest hidden sm:block">6 Month Campaign</span>
              </div>
              <div className="divide-y divide-white/5">
                {campaignMetrics.map((m) => (
                  <div key={m.label} className="flex items-center justify-between px-6 py-5 gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        {m.icon}
                      </div>
                      <p className="text-white font-bold text-sm">{m.label}</p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <span className="font-display text-xl sm:text-2xl font-black text-gray-500">{m.before}</span>
                      <ArrowRight className="w-4 h-4 text-gray-700" />
                      <span className="font-display text-xl sm:text-2xl font-black text-cyan-400">{m.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {campaignStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4">
                    {s.icon}
                  </div>
                  <span className="font-display text-2xl font-black text-cyan-400 block mb-1">{s.value}</span>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-600 text-[11px] font-medium mb-12">
            <Shield className="w-3.5 h-3.5 shrink-0" />
            Client identity anonymized to protect privacy. Results reflect this specific campaign; individual
            results vary.
          </div>

          <div className="text-center">
            <Link to="/audit">
              <Button
                size="lg"
                className="bg-[#00b8db] text-black hover:bg-white px-10 py-8 rounded-md text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,184,219,0.3)] transition-all inline-flex items-center"
              >
                Find My Ranking Gaps <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Out-Covering, explained once ── */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter text-white mb-4 uppercase italic leading-tight">
            Your Competitors Aren't Just Outranking You.
          </h2>
          <h3 className="font-display text-2xl md:text-4xl font-black tracking-tighter text-cyan-400 mb-10 uppercase italic leading-tight">
            They May Be Out-Covering You.
          </h3>

          <div className="inline-block text-left rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5 mb-12 max-w-xl">
            <p className="text-gray-300 text-sm font-medium leading-relaxed">
              <span className="text-cyan-400 font-black uppercase tracking-widest text-xs">Out-covering:</span>{" "}
              appearing across relevant searches, topics and customer questions your website doesn't currently reach.
            </p>
          </div>

          <p className="text-gray-400 text-lg font-medium mb-8">
            Most roofing companies watch a handful of obvious keywords:
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {obviousKeywords.map((kw) => (
              <span
                key={kw}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-gray-300 uppercase tracking-widest"
              >
                {kw}
              </span>
            ))}
          </div>

          {/* Scoreboard visual */}
          <div className="relative mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
              <div className="relative rounded-2xl md:rounded-r-none border border-cyan-500/40 bg-cyan-500/[0.04] p-8 md:p-10 text-center md:text-left">
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Your Roofing Company</h4>
                <span className="font-display text-6xl md:text-7xl font-black text-cyan-400 block leading-none">137</span>
                <p className="text-gray-400 font-black uppercase tracking-widest text-[11px] mt-4 mb-6">Relevant Searches</p>
                <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]" style={{ width: "22%" }} />
                </div>
              </div>

              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-black border-2 border-white/20 items-center justify-center">
                <span className="font-display font-black text-white text-sm">VS</span>
              </div>

              <div className="relative rounded-2xl md:rounded-l-none border border-orange-500/40 bg-orange-500/[0.04] p-8 md:p-10 text-center md:text-right">
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Top Competitor</h4>
                <span className="font-display text-6xl md:text-7xl font-black text-orange-400 block leading-none">624</span>
                <p className="text-gray-400 font-black uppercase tracking-widest text-[11px] mt-4 mb-6">Relevant Searches</p>
                <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.6)] ml-auto" style={{ width: "90%" }} />
                </div>
              </div>
            </div>

            <div className="flex justify-center -mt-1 relative z-10">
              <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/[0.06] px-10 py-6 text-center max-w-xs mt-6">
                <span className="font-display text-4xl font-black text-yellow-400 block leading-none">487</span>
                <p className="text-yellow-400 font-black uppercase tracking-widest text-[11px] mt-2">Search Gap</p>
                <p className="text-gray-400 text-xs font-medium mt-2">Searches they may appear for that you don't.</p>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-xs font-medium mb-4">
            Average data shown for demonstration. Run your analysis to see your actual numbers.
          </p>

          {!showVideo ? (
            <button
              type="button"
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center gap-2 text-cyan-400 text-sm font-black uppercase tracking-widest mb-12 hover:text-white transition-colors"
            >
              <Play className="w-4 h-4" fill="currentColor" /> Watch the 90-second explanation
            </button>
          ) : (
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(6,182,212,0.15)] relative bg-black">
                {videoLoaded ? (
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/N4z4ntrDiHM?autoplay=1"
                    title="See How The Ranking Gap Works"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setVideoLoaded(true)}
                    className="absolute inset-0 w-full h-full group"
                    aria-label="Play video: See How The Ranking Gap Works"
                  >
                    <img
                      src={videoThumbnail}
                      alt="Your Competitor May Not Be Outranking You — They May Be Out-Covering You. 137 vs 624 relevant searches, 487 searches you're missing."
                      className="w-full h-full object-contain bg-black"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.6)] group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}

          <p className="text-gray-500 text-lg font-medium mb-4">The question isn't simply:</p>
          <p className="text-xl md:text-2xl text-white font-black mb-10 italic">
            "Where does my roofing company rank?"
          </p>
          <p className="text-gray-500 text-lg font-medium mb-4">The bigger question is:</p>
          <h3 className="font-display text-2xl md:text-4xl font-black tracking-tighter text-white mb-16 uppercase italic leading-tight">
            "How much of my roofing search market am I actually covering?"
          </h3>

          <Link to="/audit">
            <Button
              size="lg"
              className="bg-[#00b8db] text-black hover:bg-white px-10 py-8 rounded-md text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,184,219,0.3)] transition-all inline-flex items-center"
            >
              Find My Ranking Gaps <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Founder credibility ── */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-black tracking-tighter text-white uppercase italic mb-6 leading-tight">
            Built By SEO Practitioners, <span className="text-cyan-400">Not Just Another Audit Tool</span>
          </h3>
          <p className="text-gray-400 text-base font-medium leading-relaxed mb-10 max-w-xl mx-auto">
            The Gadgetlesstech Ranking System combines more than a decade of search marketing experience with modern
            search intelligence to identify and close visibility gaps.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-display font-black text-lg shrink-0">
              KR
            </div>
            <div className="text-left">
              <p className="text-white font-black uppercase tracking-widest text-sm">Kevin Rhodes</p>
              <p className="text-gray-600 text-xs font-medium uppercase tracking-widest">Founder, Gadgetlesstech</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Eyebrow>Common Questions</Eyebrow>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic">
              Before You Run Your <span className="text-cyan-400">Free Analysis</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-white font-bold text-sm sm:text-base">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-400 text-sm font-medium leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-black tracking-tighter text-white uppercase italic mb-4">
            Still Deciding?
          </h2>
          <p className="text-gray-500 text-sm font-medium mb-8">You don't have to book a call to see your gaps.</p>
          <Link to="/audit">
            <Button
              size="lg"
              className="bg-[#00b8db] text-black hover:bg-white px-10 py-8 rounded-md text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,184,219,0.3)] transition-all inline-flex items-center"
            >
              Find My Ranking Gaps <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Sticky mobile CTA ── */}
      {showStickyCta && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5"
          style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
        >
          <button
            type="button"
            onClick={scrollToHeroInput}
            className="w-full h-12 flex items-center justify-center gap-2 bg-[#00b8db] text-black text-sm font-black uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(0,184,219,0.4)] active:scale-95 transition-all"
          >
            Find My Ranking Gaps <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
