import { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowDown,
  Check,
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
  BarChart3,
  TrendingUp,
  Calendar,
  Quote,
  Shield,
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

const exampleSearches = [
  "roof replacement near me",
  "how much does a new roof cost?",
  "roof replacement financing",
  "best shingles for Connecticut weather",
  "does insurance pay for storm damaged roof?",
  "how long does roof replacement take?",
  "GAF roofing contractor near me",
];

const systemLayers = [
  {
    id: "01",
    title: "Compact Keywords",
    description: "Identify the commercial topics closest to revenue.",
    icon: <Layers className="w-6 h-6 text-cyan-400" />,
  },
  {
    id: "02",
    title: "Topical Authority",
    description: "Build sufficient subject coverage around the services you want to own.",
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
  },
  {
    id: "03",
    title: "Page Authority",
    description: "Strengthen the pages that actually need to rank.",
    icon: <Target className="w-6 h-6 text-cyan-400" />,
  },
  {
    id: "04",
    title: "Query Expansion",
    description: "Expand core services into the complete universe of relevant customer searches.",
    icon: <Search className="w-6 h-6 text-cyan-400" />,
  },
];

const ecosystemFlow = [
  { name: "SEO4GEO", description: "Find what's missing." },
  { name: "Query Expansion System", description: "Map the larger search opportunity." },
  { name: "Gadgetlesstech AI Suite", description: "Create assets around identified opportunities." },
  { name: "Gadgetlesstech", description: "Implement the complete Ranking System." },
];

const campaignMetrics = [
  {
    label: "Ranking Search Queries",
    sub: "Total relevant searches ranking",
    before: "186",
    after: "1,247",
    icon: <Search className="w-4 h-4 text-cyan-400" />,
  },
  {
    label: "Organic Visitors / Month",
    sub: "From search engines",
    before: "742",
    after: "2,436",
    icon: <Users className="w-4 h-4 text-cyan-400" />,
  },
  {
    label: "Organic Calls & Leads / Month",
    sub: "From organic search",
    before: "14",
    after: "47",
    icon: <Phone className="w-4 h-4 text-cyan-400" />,
  },
  {
    label: "Top 10 Rankings",
    sub: "Across all relevant searches",
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
  const navigate = useNavigate();

  const handleHeroSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    const trimmed = heroUrl.trim();
    navigate(trimmed ? `/audit?url=${encodeURIComponent(trimmed)}` : "/audit");
  };

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
              Your competitors may be appearing across hundreds of searches your roofing company isn't competing for.
              Find the gaps in under 60 seconds.
            </p>
          </motion.div>

          <form onSubmit={handleHeroSubmit} className="text-left mb-8">
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
              <Check className="w-4 h-4 text-cyan-400 mr-2" /> Results In Under 60 Seconds
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
            <Eyebrow>Example Roofing Market Analysis</Eyebrow>
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

          <p className="text-center text-gray-600 text-[11px] font-black uppercase tracking-widest mb-16">
            Illustrative example only &mdash; not an actual measurement of any specific business.
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
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(6,182,212,0.15)]">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/N4z4ntrDiHM"
                title="See How The Ranking Gap Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
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

          <div className="mt-8 text-[12px] font-black uppercase tracking-[0.2em] text-gray-500">
            Free Roofing Ranking Gap Analysis &bull; No Credit Card Required
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

      {/* ── One service, hundreds of searches ── */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter text-white mb-16 uppercase italic leading-tight">
            One Roofing Service Can Represent <span className="text-cyan-400">Hundreds Of Searches</span>
          </h2>

          <p className="text-gray-400 text-lg font-medium mb-10">
            Take roof replacement.
            <br />A homeowner might search "roof replacement near me" &mdash; but other homeowners search:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16 text-left">
            {exampleSearches.map((q) => (
              <div
                key={q}
                className="px-5 py-4 bg-white/[0.02] border border-white/5 rounded-xl text-gray-300 font-medium text-sm italic"
              >
                "{q}"
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-lg font-medium mb-6">
            They can all represent opportunities surrounding the same core service.
          </p>
          <p className="text-gray-400 text-lg font-medium mb-16">
            If your strategy only targets the obvious keyword, you may be competing for a fraction of the available
            search demand.
          </p>

          <h3 className="font-display text-3xl md:text-4xl font-black tracking-tighter text-cyan-400 mb-12 uppercase italic">
            That's the Ranking Gap.
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

      {/* ── See it on your own site ── */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter text-white mb-12 uppercase italic">
            See It On <span className="text-cyan-400">Your Own Website</span>
          </h2>

          <div className="space-y-4 text-gray-400 text-lg font-medium mb-16">
            <p>No generic SEO checklist.</p>
            <p>No 50-page automated PDF filled with meaningless errors.</p>
            <p>No guessing.</p>
          </div>

          <p className="text-gray-400 text-lg font-medium mb-12">
            Enter your roofing website and let SEO4GEO identify where opportunities may exist.
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
                    <CardTitle className="font-display text-xl font-black italic uppercase tracking-tighter text-white">
                      {layer.title}
                    </CardTitle>
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
          <h3 className="text-center font-display text-2xl md:text-4xl font-black tracking-tighter text-white uppercase italic leading-tight">
            How Much Of The Search Market Are You <span className="text-cyan-400">Actually Competing For?</span>
          </h3>
        </div>
      </section>

      {/* ── Sample Campaign Results (proof) ── */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Eyebrow>Built From Real SEO Campaign Strategy</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase italic">
              What Happens When You <span className="text-cyan-400">Expand Search Coverage?</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">
              Ranking for a handful of roofing keywords is one thing. Building visibility across the entire search
              universe surrounding your roofing services can create a very different result.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-black uppercase tracking-widest">
                  Sample Roofing Campaign Results
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
                      <div className="min-w-0">
                        <p className="text-white font-bold text-sm">{m.label}</p>
                        <p className="text-gray-600 text-xs font-medium">{m.sub}</p>
                      </div>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-1">
              <h3 className="font-display text-2xl font-black uppercase tracking-tighter text-white italic mb-6 leading-tight">
                More Search Coverage Creates More Opportunities To Be Found.
              </h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4">
                The campaign didn't simply move a handful of existing keywords higher. It expanded the number of
                relevant searches the roofing company could compete for &mdash; from high-intent service searches to
                costs, problems, materials, comparisons, locations, questions and related homeowner searches.
              </p>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                That increased the number of opportunities for potential customers to discover the business before
                they ever reached a competitor.
              </p>
            </div>

            <div className="lg:col-span-1 rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col">
              <Quote className="w-6 h-6 text-cyan-400/40 mb-4" />
              <p className="text-gray-300 text-sm font-medium leading-relaxed mb-6 flex-1">
                "We stopped looking at SEO as a list of 20 or 30 keywords. Once we expanded the topics and searches
                surrounding our core services, our visibility &mdash; and the number of roofing leads coming through
                organic search &mdash; grew dramatically."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-600 text-xs font-black shrink-0">
                  RO
                </div>
                <div>
                  <p className="text-white font-black uppercase tracking-widest text-xs">Roofing Company Owner</p>
                  <p className="text-gray-600 text-[11px] font-medium">Sample testimonial &mdash; replace with verified client quote</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 rounded-2xl border border-cyan-500/30 bg-cyan-500/[0.04] p-8 flex flex-col justify-center text-center">
              <h3 className="font-display text-xl font-black uppercase tracking-tighter text-white italic mb-4">
                How Much Search Coverage Are You <span className="text-cyan-400">Missing?</span>
              </h3>
              <p className="text-gray-400 text-sm font-medium mb-6">
                Your competitors may already be visible across searches your roofing company hasn't targeted yet.
              </p>
              <Link to="/audit">
                <Button
                  size="lg"
                  className="w-full bg-[#00b8db] text-black hover:bg-white px-6 py-7 rounded-md text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,184,219,0.3)] transition-all inline-flex items-center justify-center mb-4"
                >
                  Find My Ranking Gaps <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
              <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                Free Roofing Ranking Gap Analysis &bull; No Credit Card Required
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-600 text-[11px] font-medium">
            <Shield className="w-3.5 h-3.5 shrink-0" />
            Sample data for illustrative purposes. Replace with verified client results.
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
              Finding opportunities is only step one. The Gadgetlesstech ecosystem connects diagnosis with execution.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            {ecosystemFlow.map((step, idx) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <div className="w-full rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all">
                  <h3 className="font-display text-xl md:text-2xl font-black uppercase tracking-tighter text-white mb-2">
                    {step.name}
                  </h3>
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

      {/* ── Final CTA: 90-Day Blueprint ── */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase italic">
            Want Us To <span className="text-cyan-400">Build It For You?</span>
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
            className="bg-[#00b8db] text-black hover:bg-white px-16 py-10 rounded-md text-sm font-black uppercase tracking-widest shadow-[0_0_40px_rgba(0,184,219,0.4)] transition-all inline-flex items-center mb-10"
          >
            Get My 90-Day Ranking Blueprint <ArrowRight className="ml-4 w-6 h-6" />
          </Button>

          <p className="text-gray-500 text-sm font-medium max-w-xl mx-auto">
            No generic sales presentation. We'll use your website, your market and your competitors.
          </p>
        </div>
      </section>
    </div>
  );
}
