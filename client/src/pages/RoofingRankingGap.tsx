import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowDown,
  Check,
  ChevronDown,
  Play,
  Layers,
  Zap,
  Target,
  Search,
  Home as HomeIcon,
  Swords,
  MessageCircleQuestion,
  BookOpen,
  MapPin,
  Bot,
  Users,
  Phone,
  BarChart2,
  BarChart3,
  TrendingUp,
  Calendar,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const obviousKeywords = ["roofing company", "roofer near me", "roof repair", "roof replacement"];

const searchBehaviors = [
  "They search by problem.",
  "They search by price.",
  "They search by material.",
  "They search by location.",
  "They search by urgency.",
  "They search by insurance situation.",
  "They ask questions.",
  "And increasingly, they ask AI.",
];

const opportunityCards = [
  {
    title: "Commercial Search Gaps",
    description: "Searches from homeowners actively looking for roofing services.",
    icon: <HomeIcon className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: "Competitor Gaps",
    description: "Relevant searches where competitors appear and you don't.",
    icon: <Swords className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: "Query Gaps",
    description: "Different ways customers search for the same roofing service.",
    icon: <MessageCircleQuestion className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: "Topical Gaps",
    description: "Subjects and supporting information search engines expect established roofing authorities to cover.",
    icon: <BookOpen className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: "Local Opportunities",
    description: "Service + location combinations that may expand your search visibility.",
    icon: <MapPin className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: "AI Search Opportunities",
    description: "Topics and questions that can influence visibility across modern answer and AI search environments.",
    icon: <Bot className="w-6 h-6 text-cyan-400" />,
  },
];

const receiveCards = [
  {
    title: "Keyword Gap Report",
    description: "Keywords, Technical, Competitive, Content, and Authority — each scored 0–100 with a composite overall score.",
    icon: <BarChart2 className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: "Local Pack Analysis",
    description: "Who's dominating Google Maps and organic results for your service — and how many keywords they have vs. you.",
    icon: <MapPin className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: "AI Strategy Report",
    description: "An 8-section report with critical issues, quick wins, keyword opportunities, and a 30-day action plan.",
    icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
  },
];

const systemLayers = [
  {
    id: "01",
    title: "Keyword Mapping",
    tagline: "Map the Search Market",
    description:
      "Identify the high-value services, searches, topics, locations, and intent patterns your roofing company needs to compete for.",
    icon: <Layers className="w-6 h-6 text-cyan-400" />,
  },
  {
    id: "02",
    title: "Topical Authority",
    tagline: "Build Subject Depth",
    description:
      "Create the supporting content and topical relationships search engines and AI systems need to understand what your company is relevant for.",
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
  },
  {
    id: "03",
    title: "Page Authority",
    tagline: "Strengthen the Pages That Matter",
    description: "Concentrate internal and external authority around your highest-value service and conversion pages.",
    icon: <Target className="w-6 h-6 text-cyan-400" />,
  },
  {
    id: "04",
    title: "Query Expansion",
    tagline: "Expand Search Coverage",
    description:
      "Go beyond obvious keywords to uncover the questions, comparisons, problems, costs, services, and related searches your customers actually use.",
    icon: <Search className="w-6 h-6 text-cyan-400" />,
  },
];

const ecosystemFlow = [
  {
    verb: "Diagnose",
    brand: "SEO4GEO",
    description: "Find the searches, competitors and opportunities you're missing.",
  },
  {
    verb: "Expand",
    brand: "Query Expansion System",
    description: "Map the larger search universe surrounding your most valuable services.",
  },
  {
    verb: "Build",
    brand: "AI Suite + Ranking System",
    description: "Turn opportunities into content, authority and optimization actions.",
  },
  {
    verb: "Implement",
    brand: "Gadgetlesstech",
    description: "Execute the strategy and measure the growth.",
  },
];

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
    a: "You'll see exactly where competitors are outranking and out-covering you. Act on it yourself, or ask us to map a 90-Day Ranking Blueprint.",
  },
];

const blueprintExamines = [
  "Your largest ranking gaps",
  "Your strongest competitors",
  "High-intent search opportunities",
  "Missing topical coverage",
  "Priority service pages",
  "Supporting content opportunities",
  "Authority opportunities",
  "AI-search visibility opportunities",
  "What we'd attack first",
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
  const [conversionUrl, setConversionUrl] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const heroFormRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleHeroSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const trimmed = heroUrl.trim();
    navigate(trimmed ? `/audit?url=${encodeURIComponent(trimmed)}` : "/audit");
  };

  const handleConversionSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const trimmed = conversionUrl.trim();
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
      <section className="relative pt-24 pb-32 overflow-hidden bg-black">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <Eyebrow>Free Roofing Search Visibility Analysis</Eyebrow>
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
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </section>

      {/* ── Example Roofing Market Analysis (scoreboard) ── */}
      <section className="relative py-32 bg-black border-t border-white/5 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Eyebrow>Average Roofing Coverage Comparison</Eyebrow>
          </div>

          <div className="relative mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
              <div className="relative rounded-2xl md:rounded-r-none border border-cyan-500/40 bg-cyan-500/[0.04] p-8 md:p-10 text-center md:text-left">
                <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6">Your Roofing Company</h3>
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
                <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6">Top Competitor</h3>
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

          <p className="text-center text-gray-500 text-xs font-medium mb-16">
            Sample data shown for demonstration. Run your analysis to see your actual search coverage and
            competitor gaps.
          </p>

          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-display text-3xl md:text-4xl font-black tracking-tighter text-cyan-400 mb-8 uppercase italic">
              That's the Ranking Gap.
            </h3>
            <p className="text-gray-400 text-lg font-medium mb-12" style={{ lineHeight: "1.9" }}>
              Your competitor doesn't necessarily have to beat you for the searches you're already tracking. They can
              win by appearing across hundreds of additional searches you're not competing for at all.
            </p>
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

      {/* ── Ranking Gap Explained (video) ── */}
      <section className="relative py-40 bg-[#050505] border-t border-white/5 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Eyebrow>The Ranking Gap Explained</Eyebrow>
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter text-white mb-10 uppercase italic leading-tight">
            See How The <span className="text-cyan-400">Ranking Gap</span> Works
          </h2>
          <p className="text-gray-400 text-lg font-medium mb-16 max-w-2xl mx-auto" style={{ lineHeight: "1.9" }}>
            Ranking position tells you where you appear for a search. Search coverage tells you how many relevant
            searches you're competing for in the first place.
          </p>

          <div className="relative max-w-3xl mx-auto mb-20">
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
                    src="https://img.youtube.com/vi/N4z4ntrDiHM/hqdefault.jpg"
                    alt="See How The Ranking Gap Works"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.6)] group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-black ml-1" fill="black" />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          <p className="text-gray-400 text-lg font-medium mb-10 max-w-xl mx-auto">
            You've seen how the Ranking Gap works. Now find yours.
          </p>

          <Link to="/audit">
            <Button
              size="lg"
              className="bg-[#00b8db] text-black hover:bg-white px-10 py-8 rounded-md text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,184,219,0.3)] transition-all active:scale-95 inline-flex items-center"
            >
              Find My Ranking Gaps <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </Link>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-black uppercase tracking-widest text-gray-500">
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
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none" />
      </section>

      {/* ── Not just ranking higher ── */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter text-white mb-4 uppercase italic leading-tight">
            Your Competitors Aren't Just Outranking You.
          </h2>
          <h3 className="font-display text-2xl md:text-4xl font-black tracking-tighter text-cyan-400 mb-10 uppercase italic leading-tight">
            They May Be Out-Covering You.
          </h3>

          <div className="inline-block text-left rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5 mb-16 max-w-xl">
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

          <p className="text-gray-400 text-lg font-medium mb-10">
            But homeowners don't search for roofing services four ways.
            <br />
            They search hundreds of ways.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-16 text-left">
            {searchBehaviors.map((line) => (
              <div
                key={line}
                className="flex items-center px-5 py-4 bg-white/[0.02] border border-white/5 rounded-xl text-gray-300 font-medium text-sm"
              >
                {line}
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-lg font-medium mb-4">The question isn't simply:</p>
          <p className="text-xl md:text-2xl text-white font-black mb-10 italic">
            "Where does my roofing company rank?"
          </p>
          <p className="text-gray-500 text-lg font-medium mb-4">The bigger question is:</p>
          <h3 className="font-display text-2xl md:text-4xl font-black tracking-tighter text-white mb-16 uppercase italic leading-tight">
            "How much of my roofing search market am I actually covering?"
          </h3>
          <p className="text-gray-400 text-lg font-medium mb-12">That's what we're going to help you discover.</p>

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

      {/* ── Opportunity cards ── */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase italic">
              See The Search Opportunities <span className="text-cyan-400">You May Be Missing</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">
              SEO4GEO analyzes your search visibility to identify opportunities such as:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {opportunityCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-black border-white/5 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] group overflow-hidden">
                  <CardHeader className="relative z-10">
                    <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/40 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                      {card.icon}
                    </div>
                    <CardTitle className="font-display text-xl font-black italic uppercase tracking-tighter text-white">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-500 text-[14px] leading-relaxed font-medium">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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

      {/* ── Primary Conversion Block ── */}
      <section className="relative py-32 md:py-40 bg-black border-y border-white/5 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-[40px] border-2 border-cyan-500/40 bg-gradient-to-b from-cyan-500/[0.08] to-black/60 backdrop-blur-xl p-10 md:p-16 shadow-[0_0_80px_rgba(6,182,212,0.15)] text-center">
            <span className="text-gray-400 font-black uppercase tracking-[0.3em] text-[12px] mb-6 block">
              Enough About The Example.
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white mb-6 uppercase italic leading-[1.05]">
              What's{" "}
              <span className="text-cyan-400 underline decoration-4 decoration-cyan-500/40 underline-offset-8">
                Your
              </span>{" "}
              Ranking Gap?
            </h2>
            <p className="text-gray-400 text-lg font-medium mb-10 max-w-xl mx-auto" style={{ lineHeight: "1.8" }}>
              Enter your roofing website and see where your search visibility may be falling behind competitors.
            </p>

            <form onSubmit={handleConversionSubmit} className="text-left mb-8">
              <label htmlFor="conversion-url" className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3">
                Enter your roofing website
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="conversion-url"
                  type="url"
                  value={conversionUrl}
                  onChange={(e) => setConversionUrl(e.target.value)}
                  placeholder="https://yourroofingcompany.com"
                  required
                  className="flex-1 bg-black border border-white/15 rounded-lg px-5 py-6 text-white text-lg font-medium placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/60 transition-colors"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-[#00b8db] text-black hover:bg-white px-10 py-9 rounded-lg text-base font-black uppercase tracking-widest shadow-[0_0_40px_rgba(0,184,219,0.4)] transition-all active:scale-95 inline-flex items-center justify-center whitespace-nowrap"
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

            <p className="text-gray-600 text-xs font-medium max-w-md mx-auto">
              Built for roofing companies that already have a website, serve a defined local market, and want more
              than another generic keyword report.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.12),transparent_70%)] pointer-events-none" />
      </section>

      {/* ── What You'll Receive ── */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Eyebrow>What You'll Receive</Eyebrow>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic">
              Imagine Your Own <span className="text-cyan-400">Website Analysis</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {receiveCards.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all"
              >
                <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="font-display font-black text-white uppercase tracking-tighter text-base mb-2 italic">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Framework ── */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Eyebrow>The Proprietary Stack</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase italic">
              Powered By The <span className="text-cyan-400">Gadgetlesstech Ranking System</span>™
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">
              SEO4GEO isn't another generic website grader. It's the diagnostic layer of the Gadgetlesstech Ranking
              System &mdash; examining search visibility through four interconnected layers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {systemLayers.map((layer, idx) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-black border-white/5 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] group overflow-hidden">
                  <CardHeader className="relative z-10">
                    <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/40 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                      {layer.icon}
                    </div>
                    <div className="text-[12px] font-black text-gray-700 mb-2 uppercase tracking-[0.2em]">{layer.id}</div>
                    <CardTitle className="font-display text-xl font-black italic uppercase tracking-tighter text-white mb-1">
                      {layer.title}
                    </CardTitle>
                    <p className="text-cyan-400 font-black uppercase tracking-widest text-[11px]">{layer.tagline}</p>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-500 text-[14px] leading-relaxed font-medium">{layer.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-lg font-medium mb-6 max-w-3xl mx-auto">
            Together, these reveal something keyword tracking alone cannot:
          </p>
          <h3 className="text-center font-display text-2xl md:text-4xl font-black tracking-tighter text-white uppercase italic leading-tight mb-16">
            How Much Of The Search Market Are You <span className="text-cyan-400">Actually Competing For?</span>
          </h3>

          <p className="text-center text-gray-400 text-lg font-medium max-w-2xl mx-auto" style={{ lineHeight: "1.9" }}>
            The goal isn't more content for the sake of content. It's greater search coverage across the queries
            that can actually produce business.
          </p>
        </div>
      </section>

      {/* ── Real Campaign Results (proof, anonymized client) ── */}
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

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div>
                <p className="text-gray-500 font-black uppercase tracking-widest text-xs mb-3">Before</p>
                <p className="text-white font-bold text-sm mb-4">186 ranking queries</p>
                <div className="flex gap-1.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className={`h-3 flex-1 rounded-sm ${i < 2 ? "bg-cyan-500/50" : "bg-white/5"}`} />
                  ))}
                </div>
              </div>
              <div className="text-center">
                <p className="text-cyan-400 font-black uppercase tracking-widest text-xs mb-1">Query Expansion</p>
                <p className="text-gray-600 font-black uppercase tracking-widest text-[10px] mb-4">+ Search Coverage</p>
                <ArrowRight className="w-8 h-8 text-cyan-400/40 mx-auto hidden md:block" />
                <ArrowDown className="w-8 h-8 text-cyan-400/40 mx-auto md:hidden" />
              </div>
              <div>
                <p className="text-gray-500 font-black uppercase tracking-widest text-xs mb-3">After</p>
                <p className="text-white font-bold text-sm mb-4">1,247 ranking queries</p>
                <div className="flex gap-1.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-3 flex-1 rounded-sm bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-600 text-[11px] font-medium mb-12">
            <Shield className="w-3.5 h-3.5 shrink-0" />
            Client identity anonymized to protect privacy. Results reflect this specific campaign; individual
            results vary.
          </div>

          <div className="text-center">
            <p className="font-display text-lg md:text-xl font-black uppercase tracking-tight text-gray-400 mb-10">
              More Search Coverage <span className="text-cyan-400/50 mx-2">→</span> More Visibility{" "}
              <span className="text-cyan-400/50 mx-2">→</span> More Traffic{" "}
              <span className="text-cyan-400/50 mx-2">→</span> <span className="text-cyan-400">More Opportunities</span>
            </p>
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

      {/* ── Human Credibility ── */}
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

      {/* ── Ranking Gap to Ranking Plan ── */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase italic">
              From <span className="text-cyan-400">Ranking Gap</span> To Ranking Plan
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">
              Finding opportunities is only step one. Here's how we carry it through to results.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            {ecosystemFlow.map((step, idx) => (
              <motion.div
                key={step.verb}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <div className="w-full rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all">
                  <h3 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tighter text-white mb-2 italic">
                    <span className="text-cyan-400">{idx + 1} &mdash;</span> {step.verb}
                  </h3>
                  <span className="text-cyan-500/60 font-black uppercase tracking-[0.2em] text-[11px] mb-3 block">
                    {step.brand}
                  </span>
                  <p className="text-gray-500 text-sm font-medium">{step.description}</p>
                </div>
                {idx < ecosystemFlow.length - 1 && (
                  <div className="flex justify-center py-4">
                    <ArrowDown className="w-6 h-6 text-cyan-500/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 90-Day Blueprint ── */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase italic leading-tight">
            Found Your Gaps? <span className="text-cyan-400">Now Let's Build The Plan To Close Them.</span>
          </h2>
          <p className="text-gray-400 text-lg font-medium mb-4 max-w-2xl mx-auto">
            Once you've identified your ranking gaps, Gadgetlesstech can map the opportunities we'd prioritize during
            your first 90 days.
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-black tracking-tighter text-white mb-12 uppercase italic">
            Get Your 90-Day Roofing Ranking Blueprint
          </h3>

          <div className="bg-white/5 rounded-[32px] border border-white/10 p-10 md:p-16 mb-12">
            <p className="text-cyan-400 font-black uppercase tracking-[0.2em] text-[12px] mb-8">We'll examine</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 text-left max-w-2xl mx-auto">
              {blueprintExamines.map((item) => (
                <div key={item} className="flex items-center text-gray-300 font-medium text-sm">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-4 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => window.dispatchEvent(new CustomEvent("open-calendar"))}
            size="lg"
            className="bg-white text-black hover:bg-cyan-400 px-16 py-10 rounded-md text-sm font-black uppercase tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all inline-flex items-center mb-10"
          >
            Get My 90-Day Ranking Blueprint <ArrowRight className="ml-4 w-6 h-6" />
          </Button>

          <p className="text-gray-500 text-sm font-medium max-w-xl mx-auto">
            No generic sales presentation. We'll use your website, your market and your competitors.
          </p>
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
