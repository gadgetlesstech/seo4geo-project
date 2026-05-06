import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Loader2, TrendingUp, Users, Globe, Star, CheckCircle2, MapPin, BarChart2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface AuditResult {
  report: string;
  auditData: {
    url: string;
    keyword: string;
    city: string;
    competitors: Competitor[];
    keywordData: KeywordData;
  };
}

const inputClass =
  "w-full bg-black border border-white/10 rounded-lg px-4 py-4 text-white text-sm font-medium placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/50 transition-colors";

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

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

  return (
    <div className="pt-32 pb-32 bg-black min-h-screen relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[12px] mb-6 block flex items-center">
            <div className="w-12 h-px bg-cyan-400/30 mr-4" />
            Free Local SEO Audit
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase italic leading-[0.9]">
            SEO GAP <span className="text-cyan-400">ANALYSIS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl font-medium">
            Enter your website and target keyword to see exactly where you stand against local competitors — and which keywords you're leaving on the table.
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
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourbusiness.com"
                required
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[12px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Target Keyword</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. plumber, dentist, hvac"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-[12px] font-black uppercase tracking-widest text-gray-500 mb-3 block">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Austin, TX"
                required
                className={inputClass}
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00b8db] text-black hover:bg-white py-8 rounded-xl font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(0,184,219,0.3)] transition-all disabled:opacity-60"
          >
            {loading ? (
              <><Loader2 className="mr-3 w-5 h-5 animate-spin" /> Running Audit — This Takes ~30s...</>
            ) : (
              <>Run My Free Audit <ArrowRight className="ml-3 w-5 h-5" /></>
            )}
          </Button>
        </motion.form>

        {/* What you get — shown before results */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <p className="text-[12px] font-black uppercase tracking-widest text-gray-600 mb-8 text-center">What Your Audit Reveals</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <MapPin className="w-6 h-6 text-cyan-400" />,
                  title: "Local Pack Analysis",
                  desc: "See exactly who's dominating the Google Maps results for your keyword and city — and how they compare to you.",
                },
                {
                  icon: <BarChart2 className="w-6 h-6 text-cyan-400" />,
                  title: "Keyword Gap Report",
                  desc: "Discover the exact keywords your top competitors rank for that your site is completely invisible for.",
                },
                {
                  icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
                  title: "AI Strategy Report",
                  desc: "Get a custom action plan generated by Claude AI based on your specific gap — no generic advice.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group"
                >
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
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-[12px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" /> Your Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-black text-white">{result.auditData.keywordData.userKeywordCount.toLocaleString()}</p>
                  <p className="text-[12px] text-gray-600 uppercase tracking-widest font-bold mt-1">
                    {result.auditData.keywordData.userRanksForKeyword
                      ? <span className="text-cyan-400">✓ Ranks for "{result.auditData.keywordData.userDomain}"</span>
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
                  <p className="text-4xl font-black text-cyan-400">{result.auditData.keywordData.keywordsUserIsMissing.length}</p>
                  <p className="text-[12px] text-gray-600 uppercase tracking-widest font-bold mt-1">Opportunities identified</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-[12px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" /> Competitors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-black text-white">{result.auditData.competitors.length}</p>
                  <p className="text-[12px] text-gray-600 uppercase tracking-widest font-bold mt-1">In your local pack</p>
                </CardContent>
              </Card>
            </div>

            {/* Competitors */}
            <div>
              <h2 className="font-display text-2xl font-black uppercase tracking-tighter text-white mb-6 italic">
                Local Pack Competitors
              </h2>
              <div className="space-y-3">
                {result.auditData.competitors.map((c, i) => {
                  const kwData = result.auditData.keywordData.competitors[i];
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

            {/* Gap Keywords */}
            {result.auditData.keywordData.keywordsUserIsMissing.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-black uppercase tracking-tighter text-white mb-2 italic">
                  Keyword Gap — You're Missing These
                </h2>
                <p className="text-gray-500 text-sm font-medium mb-6">
                  Keywords your competitors rank for that your site doesn't appear for.
                </p>
                <div className="flex flex-wrap gap-3">
                  {result.auditData.keywordData.keywordsUserIsMissing.map((kw, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white/5 border border-white/5 hover:border-cyan-500/40 rounded-lg text-sm text-gray-300 font-medium transition-colors flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/60" />
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* AI Report */}
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

            {/* CTA */}
            <div className="text-center pt-8">
              <p className="text-gray-500 text-sm font-medium mb-6">Ready to close the gap and dominate your local market?</p>
              <Button
                onClick={() => window.dispatchEvent(new CustomEvent('open-calendar'))}
                className="bg-[#00b8db] text-black hover:bg-white px-12 py-8 rounded-xl font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(0,184,219,0.3)] transition-all"
              >
                Book a Strategy Call <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
}
