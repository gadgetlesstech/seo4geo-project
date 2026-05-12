import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Loader2, TrendingUp, Users, Globe, Star, CheckCircle2, MapPin, BarChart2, Sparkles, Shield, Link2, AlertTriangle, Search, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Competitor {
  title?: string;
  domain: string;
  rating: number | null;
  reviews: number | null;
  address: string | null;
}

interface CompetitorKeywordData {
  domain: string;
  keywordCount: number;
  ranksForKeyword: boolean;
  sharedWithUser: number;
  uniqueToCompetitor: number;
}

interface KeywordData {
  userDomain: string;
  userRanksForKeyword: boolean;
  userKeywordCount: number;
  competitors: CompetitorKeywordData[];
  keywordsUserIsMissing: string[];
}

interface SeoCompetitor {
  domain: string;
  metrics?: { organic?: { count?: number; etv?: number } };
}

interface BacklinkSummary {
  backlinks?: number;
  referring_domains?: number;
  backlinks_dofollow?: number;
  rank?: number;
}

interface TechnicalIssues {
  critical: string[];
  high: string[];
  medium: string[];
}

interface ContentGapItem {
  keyword_data?: {
    keyword?: string;
    keyword_info?: { search_volume?: number };
  };
}

interface Scores {
  overall: number;
  keyword: number;
  technical: number;
  competitive: number;
  content: number;
  authority: number;
  aiVisibility: number;
}

interface AiMentionItem {
  question?: string;
  answer?: string;
  ai_search_volume?: number;
  sources?: { domain?: string; title?: string; url?: string }[];
}

interface AiKeywordVolumeItem {
  keyword?: string;
  ai_search_volume?: number;
}

interface AiData {
  llmMentions: AiMentionItem[];
  llmTopDomains: { domain?: string }[];
  aiKeywordVolume: AiKeywordVolumeItem[];
  isCited: boolean;
  citingCompetitors: string[];
}

interface DomainOverview {
  metrics?: { organic?: { etv?: number; count?: number } };
  rank?: number;
}

interface AuditResult {
  report: string;
  auditData: {
    url: string;
    keyword: string;
    city: string;
    competitors: Competitor[];
    keywordData: KeywordData;
    seoCompetitors?: SeoCompetitor[];
    backlinkSummary?: BacklinkSummary;
    technicalIssues?: TechnicalIssues;
    contentGap?: ContentGapItem[];
    scores?: Scores;
    domainOverview?: DomainOverview;
    aiData?: AiData;
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 70) return "#22c55e";
  if (score >= 45) return "#f59e0b";
  return "#ef4444";
}

function scoreLabel(score: number): string {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  if (score >= 20) return "Weak";
  return "Critical";
}

function ScoreGauge({ label, score, icon }: { label: string; score: number; icon: React.ReactNode }) {
  const color = scoreColor(score);
  const circumference = 2 * Math.PI * 28;
  const offset = circumference * (1 - score / 100);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <circle
            cx="32" cy="32" r="28"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-black text-white">{score}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-gray-400">
        <span className="w-3.5 h-3.5">{icon}</span>
        <span className="text-[11px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-[10px] font-black uppercase tracking-wider" style={{ color }}>{scoreLabel(score)}</span>
    </div>
  );
}

const inputClass =
  "w-full bg-black border border-white/10 rounded-lg px-4 py-4 text-white text-sm font-medium placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/50 transition-colors";

// ── Main component ─────────────────────────────────────────────────────────────

const N8N_WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL || "";
const UNLOCK_KEY = "seo4geo_audit_unlocked";

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [gateName, setGateName] = useState("");
  const [gateEmail, setGateEmail] = useState("");
  const [gateLoading, setGateLoading] = useState(false);
  const [gateLimitReached, setGateLimitReached] = useState(false);

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setUnlocked(false);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, keyword, city }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Audit failed");
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateLoading(true);
    try {
      const limitRes = await fetch("/api/audit-limit/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: gateEmail }),
      });
      const limitData = await limitRes.json();
      if (!limitData.allowed) {
        setGateLoading(false);
        setGateLimitReached(true);
        return;
      }
      if (N8N_WEBHOOK) {
        await fetch(N8N_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: gateName,
            email: gateEmail,
            website: result?.auditData?.url || "",
            source: "seo4geo_audit_gate",
          }),
        });
      }
    } catch (_) {}
    setGateLoading(false);
    setUnlocked(true);
  };

  const ad = result?.auditData;
  const scores = ad?.scores;

  return (
    <div className="pt-32 pb-32 bg-black min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[12px] mb-6 block flex items-center">
            <div className="w-12 h-px bg-cyan-400/30 mr-4" />
            Free Local SEO AEO GEO Audit
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase italic leading-[0.9]">
            SEO AEO GEO <span className="text-cyan-400">GAP ANALYSIS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl font-medium">
            Enter your website and target keyword to see exactly where you stand against local competitors — and which keyword searches you're leaving on the table.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-[32px] p-8 md:p-12 mb-12 shadow-[0_0_60px_rgba(6,182,212,0.05)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-3">
              <label className="text-[12px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Your Website URL</label>
              <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://yourbusiness.com" required className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className="text-[12px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Target Keyword</label>
              <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="e.g. plumber, dentist, hvac" required className={inputClass} />
            </div>
            <div>
              <label className="text-[12px] font-black uppercase tracking-widest text-gray-500 mb-3 block">City</label>
              <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Austin, TX" required className={inputClass} />
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00b8db] text-black hover:bg-white py-8 rounded-xl font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(0,184,219,0.3)] transition-all disabled:opacity-60"
          >
            {loading ? (
              <><Loader2 className="mr-3 w-5 h-5 animate-spin" /> Running Full Audit — ~45s...</>
            ) : (
              <>Run My Free Audit <ArrowRight className="ml-3 w-5 h-5" /></>
            )}
          </Button>
        </motion.form>

        {/* Pre-result feature cards */}
        {!result && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
            <p className="text-[12px] font-black uppercase tracking-widest text-gray-600 mb-8 text-center">What Your Audit Reveals</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <BarChart2 className="w-6 h-6 text-cyan-400" />, title: "Keyword Gap Report", desc: "Keywords, Technical, Competitive, Content, and Authority — each scored 0–100 with a composite overall score." },
                { icon: <MapPin className="w-6 h-6 text-cyan-400" />, title: "Local Pack Analysis", desc: "Who's dominating Google Maps and organic results for your keyword — and how many keywords they have vs. you." },
                { icon: <Sparkles className="w-6 h-6 text-cyan-400" />, title: "AI Strategy Report", desc: "8-section report with critical issues, quick wins, keyword opportunities, and a 30-day action plan." },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group">
                  <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center mb-5 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-black text-white uppercase tracking-tighter text-base mb-2 italic">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Results */}
        {result && ad && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">

            {/* ── SEO Score Dashboard ── */}
            {scores && (
              <div>
                <h2 className="font-display text-2xl font-black uppercase tracking-tighter text-white mb-6 italic">
                  SEO Health Score
                </h2>
                {/* Overall score */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6 flex flex-col sm:flex-row items-center gap-8">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                      <circle cx="32" cy="32" r="28" fill="none" stroke={scoreColor(scores.overall)} strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={2 * Math.PI * 28 * (1 - scores.overall / 100)}
                        style={{ transition: "stroke-dashoffset 1s ease" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-white">{scores.overall}</span>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">/100</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-2xl font-black text-white uppercase tracking-tighter italic mb-1">
                      Overall: <span style={{ color: scoreColor(scores.overall) }}>{scoreLabel(scores.overall)}</span>
                    </p>
                    {ad.domainOverview?.metrics?.organic && (
                      <div className="flex flex-wrap gap-6 mt-4">
                        <div>
                          <p className="text-2xl font-black text-cyan-400">{(ad.domainOverview.metrics.organic.etv ?? 0).toLocaleString()}</p>
                          <p className="text-[11px] text-gray-600 uppercase tracking-widest font-bold">Organic Traffic/mo</p>
                        </div>
                        <div>
                          <p className="text-2xl font-black text-white">{(ad.domainOverview.metrics.organic.count ?? 0).toLocaleString()}</p>
                          <p className="text-[11px] text-gray-600 uppercase tracking-widest font-bold">Ranking Keywords</p>
                        </div>
                        <div>
                          <p className="text-2xl font-black text-white">{ad.domainOverview.rank ?? 0}/1000</p>
                          <p className="text-[11px] text-gray-600 uppercase tracking-widest font-bold">Domain Rank</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 6 dimension gauges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="p-5 bg-white/5 border border-white/5 rounded-xl flex justify-center">
                    <ScoreGauge label="Keywords" score={scores.keyword} icon={<Search className="w-3.5 h-3.5" />} />
                  </div>
                  <div className="p-5 bg-white/5 border border-white/5 rounded-xl flex justify-center">
                    <ScoreGauge label="Technical" score={scores.technical} icon={<Shield className="w-3.5 h-3.5" />} />
                  </div>
                  <div className="p-5 bg-white/5 border border-white/5 rounded-xl flex justify-center">
                    <ScoreGauge label="Competitive" score={scores.competitive} icon={<TrendingUp className="w-3.5 h-3.5" />} />
                  </div>
                  <div className="p-5 bg-white/5 border border-white/5 rounded-xl flex justify-center">
                    <ScoreGauge label="Content" score={scores.content} icon={<Sparkles className="w-3.5 h-3.5" />} />
                  </div>
                  <div className="p-5 bg-white/5 border border-white/5 rounded-xl flex justify-center">
                    <ScoreGauge label="Authority" score={scores.authority} icon={<Link2 className="w-3.5 h-3.5" />} />
                  </div>
                  <div className="p-5 border rounded-xl flex justify-center"
                    style={{
                      background: scores.aiVisibility > 0 ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.03)',
                      borderColor: scores.aiVisibility > 0 ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.05)',
                    }}>
                    <ScoreGauge label="AI Visible" score={scores.aiVisibility} icon={<Bot className="w-3.5 h-3.5" />} />
                  </div>
                </div>
              </div>
            )}

            {/* ── Quick stat row ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-[12px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" /> Your Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-black text-white">{ad.keywordData.userKeywordCount.toLocaleString()}</p>
                  <p className="text-[12px] text-gray-600 uppercase tracking-widest font-bold mt-1">
                    {ad.keywordData.userRanksForKeyword
                      ? <span className="text-cyan-400">✓ Ranks for "{keyword}"</span>
                      : `Not ranking for "${keyword}"`}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-[12px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" /> Gap Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-black text-cyan-400">
                    {(ad.contentGap?.length ?? ad.keywordData.keywordsUserIsMissing.length)}
                  </p>
                  <p className="text-[12px] text-gray-600 uppercase tracking-widest font-bold mt-1">Opportunities found</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-[12px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" /> Competitors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-black text-white">{ad.competitors.length}</p>
                  <p className="text-[12px] text-gray-600 uppercase tracking-widest font-bold mt-1">In your local pack</p>
                </CardContent>
              </Card>
            </div>

            {/* ── Gated detail sections ── */}
            <div className="relative">
              {/* blurred content */}
              <div className={unlocked ? undefined : "pointer-events-none select-none blur-sm opacity-40"}>

            {/* ── Technical Issues ── */}
            {ad.technicalIssues && (
              (ad.technicalIssues.critical.length + ad.technicalIssues.high.length + ad.technicalIssues.medium.length) > 0
            ) && (
              <div>
                <h2 className="font-display text-2xl font-black uppercase tracking-tighter text-white mb-6 italic flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-400" /> Technical Issues
                </h2>
                <div className="space-y-3">
                  {ad.technicalIssues.critical.map((issue, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <span className="text-red-400 font-black text-xs uppercase tracking-widest mt-0.5 flex-shrink-0">Critical</span>
                      <span className="text-red-300 text-sm font-medium">{issue}</span>
                    </div>
                  ))}
                  {ad.technicalIssues.high.map((issue, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <span className="text-amber-400 font-black text-xs uppercase tracking-widest mt-0.5 flex-shrink-0">High</span>
                      <span className="text-amber-200/80 text-sm font-medium">{issue}</span>
                    </div>
                  ))}
                  {ad.technicalIssues.medium.map((issue, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white/5 border border-white/5 rounded-xl">
                      <span className="text-gray-500 font-black text-xs uppercase tracking-widest mt-0.5 flex-shrink-0">Medium</span>
                      <span className="text-gray-400 text-sm font-medium">{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Backlink Profile ── */}
            {ad.backlinkSummary && (
              <div>
                <h2 className="font-display text-2xl font-black uppercase tracking-tighter text-white mb-6 italic flex items-center gap-3">
                  <Link2 className="w-6 h-6 text-cyan-400" /> Backlink Profile
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Total Backlinks", value: (ad.backlinkSummary.backlinks ?? 0).toLocaleString() },
                    { label: "Referring Domains", value: (ad.backlinkSummary.referring_domains ?? 0).toLocaleString() },
                    { label: "Dofollow Links", value: (ad.backlinkSummary.backlinks_dofollow ?? 0).toLocaleString() },
                    { label: "Domain Rank", value: `${ad.backlinkSummary.rank ?? 0}/1000` },
                  ].map((stat, i) => (
                    <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-xl">
                      <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                      <p className="text-[11px] text-gray-600 uppercase tracking-widest font-bold">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── AI Visibility ── */}
            {ad.aiData && (
              <div>
                <h2 className="font-display text-2xl font-black uppercase tracking-tighter text-white mb-2 italic flex items-center gap-3">
                  <Bot className="w-6 h-6 text-violet-400" />
                  AI Visibility
                  <span className="text-sm font-medium normal-case tracking-normal italic-none"
                    style={{ color: ad.aiData.isCited ? '#22c55e' : '#ef4444' }}>
                    {ad.aiData.isCited ? '— Appearing in AI answers' : '— Not appearing in AI answers'}
                  </span>
                </h2>
                <p className="text-gray-500 text-sm font-medium mb-6">
                  How visible this domain is in Google AI Overviews and ChatGPT responses.
                </p>

                {/* Citation status banner */}
                <div className={`flex items-start gap-4 p-5 rounded-xl border mb-6 ${
                  ad.aiData.isCited
                    ? 'bg-green-500/10 border-green-500/25'
                    : 'bg-red-500/10 border-red-500/25'
                }`}>
                  <span className="text-2xl flex-shrink-0">{ad.aiData.isCited ? '✅' : '❌'}</span>
                  <div>
                    <p className={`font-black text-sm uppercase tracking-widest mb-1 ${ad.aiData.isCited ? 'text-green-400' : 'text-red-400'}`}>
                      {ad.aiData.isCited
                        ? 'Domain is being cited in AI responses'
                        : 'Domain is NOT cited in Google AI Overview or ChatGPT'}
                    </p>
                    <p className="text-gray-400 text-sm font-medium">
                      {ad.aiData.isCited
                        ? `Found in ${ad.aiData.llmMentions.length} AI response${ad.aiData.llmMentions.length !== 1 ? 's' : ''}. See the GEO strategy in the AI report below to maintain and expand this visibility.`
                        : 'Your competitors are being cited while you are invisible to AI-powered search. See the GEO strategy in the AI report below.'}
                    </p>
                  </div>
                </div>

                {/* AI keyword volume + competing domains */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* AI search volumes */}
                  {ad.aiData.aiKeywordVolume.length > 0 && (
                    <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
                      <p className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-4">AI Search Volume</p>
                      <div className="space-y-3">
                        {ad.aiData.aiKeywordVolume.filter(v => (v.ai_search_volume ?? 0) > 0).map((v, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm font-medium truncate max-w-[60%]">"{v.keyword}"</span>
                            <div className="text-right">
                              <span className="text-violet-400 font-black">{(v.ai_search_volume ?? 0).toLocaleString()}</span>
                              <span className="text-gray-600 text-xs ml-1">/mo in AI</span>
                            </div>
                          </div>
                        ))}
                        {ad.aiData.aiKeywordVolume.every(v => !(v.ai_search_volume ?? 0)) && (
                          <p className="text-gray-600 text-sm">No AI volume data for this keyword yet.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Competing domains in AI */}
                  {ad.aiData.citingCompetitors.length > 0 && (
                    <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
                      <p className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-4">
                        Who AI Cites Instead
                      </p>
                      <div className="space-y-2">
                        {ad.aiData.citingCompetitors.map((domain, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-gray-600 w-4">{i + 1}</span>
                            <span className="text-sm font-black text-white uppercase tracking-tight">{domain}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sample AI mentions */}
                {ad.aiData.llmMentions.length > 0 && (
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-3">
                      AI Questions Where Your Domain Appeared
                    </p>
                    <div className="space-y-2">
                      {ad.aiData.llmMentions.slice(0, 4).map((mention, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-violet-500/5 border border-violet-500/15 rounded-xl">
                          <Bot className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-300 text-sm font-medium">{mention.question ?? '(question unavailable)'}</p>
                            {(mention.ai_search_volume ?? 0) > 0 && (
                              <p className="text-[11px] text-violet-400/70 mt-1">
                                {(mention.ai_search_volume ?? 0).toLocaleString()} AI searches/mo
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Local Pack Competitors ── */}
            <div>
              <h2 className="font-display text-2xl font-black uppercase tracking-tighter text-white mb-6 italic">
                Local Pack Competitors
              </h2>
              <div className="space-y-3">
                {ad.competitors.map((c, i) => {
                  const kwData = ad.keywordData.competitors[i];
                  return (
                    <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-xl hover:border-cyan-500/30 transition-all">
                      <div>
                        <p className="font-black text-white uppercase tracking-tight text-sm">{c.title ?? c.domain}</p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">{c.domain}</p>
                        {c.address && <p className="text-[12px] text-gray-700 font-medium mt-1">{c.address}</p>}
                      </div>
                      <div className="flex items-center gap-6 text-right">
                        {c.rating != null && (
                          <div>
                            <p className="text-cyan-400 font-black text-lg flex items-center gap-1">
                              <Star className="w-4 h-4" /> {c.rating}
                            </p>
                            <p className="text-[12px] text-gray-600 uppercase tracking-widest font-bold">{c.reviews?.toLocaleString()} reviews</p>
                          </div>
                        )}
                        {kwData && (
                          <div>
                            <p className="text-white font-black text-lg">{kwData.keywordCount.toLocaleString()}</p>
                            <p className="text-[12px] text-gray-600 uppercase tracking-widest font-bold">keywords</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Organic SEO Competitors ── */}
            {ad.seoCompetitors && ad.seoCompetitors.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-black uppercase tracking-tighter text-white mb-2 italic">
                  Organic SEO Competitors
                </h2>
                <p className="text-gray-500 text-sm font-medium mb-6">Domains competing with you in Google organic results.</p>
                <div className="space-y-2">
                  {ad.seoCompetitors.slice(0, 8).map((c, i) => {
                    const traffic = c.metrics?.organic?.etv ?? 0;
                    const keywords = c.metrics?.organic?.count ?? 0;
                    return (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:border-cyan-500/30 transition-all">
                        <span className="font-black text-white text-sm uppercase tracking-tight">{c.domain}</span>
                        <div className="flex items-center gap-6 text-right">
                          <div>
                            <p className="text-cyan-400 font-black">{traffic.toLocaleString()}</p>
                            <p className="text-[11px] text-gray-600 uppercase tracking-widest font-bold">traffic/mo</p>
                          </div>
                          <div>
                            <p className="text-white font-black">{keywords.toLocaleString()}</p>
                            <p className="text-[11px] text-gray-600 uppercase tracking-widest font-bold">keywords</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Content Gap Keywords ── */}
            {((ad.contentGap?.length ?? 0) > 0 || ad.keywordData.keywordsUserIsMissing.length > 0) && (
              <div>
                <h2 className="font-display text-2xl font-black uppercase tracking-tighter text-white mb-2 italic">
                  Keyword Gap — You're Missing These
                </h2>
                <p className="text-gray-500 text-sm font-medium mb-6">
                  Keywords competitors rank for that your site doesn't appear for.
                </p>
                <div className="flex flex-wrap gap-3">
                  {(ad.contentGap?.length
                    ? ad.contentGap.map(item => ({
                        kw: item.keyword_data?.keyword ?? '',
                        vol: item.keyword_data?.keyword_info?.search_volume ?? 0,
                      })).filter(x => x.kw)
                    : ad.keywordData.keywordsUserIsMissing.map(kw => ({ kw, vol: 0 }))
                  ).map(({ kw, vol }, i) => (
                    <span key={i}
                      className="px-4 py-2 bg-white/5 border border-white/5 hover:border-cyan-500/40 rounded-lg text-sm text-gray-300 font-medium transition-colors flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/60" />
                      {kw}
                      {vol > 0 && <span className="text-[11px] text-gray-600">{vol.toLocaleString()}/mo</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── AI Strategy Report ── */}
            <div>
              <h2 className="font-display text-2xl font-black uppercase tracking-tighter text-white mb-6 italic">
                AI Strategy Report
              </h2>
              <div className="bg-white/5 border border-white/10 rounded-[24px] p-8 space-y-4">
                {result.report.split('\n').filter(Boolean).map((line, i) => (
                  <p key={i} className="text-gray-400 font-medium leading-relaxed text-sm">{line}</p>
                ))}
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="text-center pt-8">
              <p className="text-gray-500 text-sm font-medium mb-6">Ready to close the gap and dominate your local market?</p>
              <Button
                onClick={() => window.dispatchEvent(new CustomEvent('open-calendar'))}
                className="bg-[#00b8db] text-black hover:bg-white px-12 py-8 rounded-xl font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(0,184,219,0.3)] transition-all"
              >
                Book a Strategy Call <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>

              </div>{/* end blurred content */}

              {/* Gate overlay — shown when locked */}
              {!unlocked && (
                <div className="absolute inset-0 flex items-start justify-center pt-24 z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-[#0a0f1a] border border-white/10 rounded-3xl p-10 shadow-[0_0_80px_rgba(0,184,219,0.18)] backdrop-blur-md"
                  >
                    {gateLimitReached ? (
                      <div className="text-center">
                        <p className="text-red-400 font-black uppercase tracking-[0.3em] text-xs mb-3">Free Audit Limit Reached</p>
                        <h3 className="font-display text-3xl font-black uppercase tracking-tighter text-white mb-3 leading-tight">
                          You've Used Your 2 Free Audits
                        </h3>
                        <p className="text-white/50 text-sm mb-8">
                          Book a free strategy call to get unlimited access and a full custom ranking report built for your business.
                        </p>
                        <button
                          onClick={() => window.dispatchEvent(new CustomEvent('open-calendar'))}
                          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#00b8db] text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-white transition-all"
                        >
                          Book a Strategy Call <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-cyan-400 font-black uppercase tracking-[0.3em] text-xs mb-3">Your Audit Is Ready</p>
                        <h3 className="font-display text-3xl font-black uppercase tracking-tighter text-white mb-3 leading-tight">
                          Unlock Your Full Report
                        </h3>
                        <p className="text-white/40 text-sm mb-8">
                          Enter your email to see the complete breakdown — technical issues, backlinks, AI visibility, keyword gaps, and your custom action plan.
                        </p>
                        <form onSubmit={handleUnlock} className="space-y-4">
                          <input
                            type="text"
                            placeholder="First name"
                            value={gateName}
                            onChange={(e) => setGateName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                          />
                          <input
                            type="email"
                            placeholder="Email address *"
                            value={gateEmail}
                            onChange={(e) => setGateEmail(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                          />
                          <button
                            type="submit"
                            disabled={gateLoading || !gateEmail}
                            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#00b8db] text-black font-black uppercase tracking-widest text-sm rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {gateLoading ? "Unlocking…" : "Unlock Full Report"} <ArrowRight className="w-4 h-4" />
                          </button>
                        </form>
                        <p className="text-white/20 text-xs text-center mt-5">No spam. Unsubscribe anytime.</p>
                      </>
                    )}
                </div>
              )}
            </div>{/* end gated wrapper */}

          </motion.div>
        )}
      </div>
    </div>
  );
}
