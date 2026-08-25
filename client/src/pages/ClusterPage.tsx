import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const clusterContent: Record<string, { title: string; content: string[]; focus: string[] }> = {
  "rank-without-backlinks": {
    title: "How to Rank Without Backlinks Using Authority-Based SEO",
    content: [
      "Traditional SEO relies heavily on backlink profiles, but the 2026 landscape has shifted toward semantic authority. By saturating your content with relevant entities and establishing a clear topical silo, you can signal to search engines that your page is the definitive source without needing external validation.",
      "The key is internal linking dominance. Every page within your cluster should reinforce the authority of the pillar page, creating a web of relevance that is impossible for search engines to ignore."
    ],
    focus: ["Topical Authority", "Semantic Saturation", "Internal Linking Dominance"]
  },
  "compact-keyword-strategy": {
    title: "The Compact Keyword Strategy: How to Cover Thousands of Search Variations",
    content: [
      "Keyword mapping is the art of stacking phrases so that a single piece of content can rank for hundreds of long-tail variations. Instead of creating separate pages for every keyword, we embed them naturally within a high-authority structure.",
      "This approach reduces content bloat and concentrates ranking power, allowing individual pages to punch far above their weight class."
    ],
    focus: ["Keyword Mapping", "Phrase Stacking", "Natural Embedding"]
  },
  "page-level-seo-signals": {
    title: "Page-Level SEO Signals: How Individual Pages Gain Ranking Power",
    content: [
      "Search engines are increasingly looking at page-level signals rather than just domain-wide authority. Content depth, engagement triggers, and on-page authority signals are now the primary drivers of ranking success.",
      "We focus on creating 'sticky' content that keeps users engaged, signaling to Google that the page provides exceptional value for the specific query."
    ],
    focus: ["On-page Authority Signals", "Content Depth", "Engagement Triggers"]
  },
  "topical-authority-seo": {
    title: "Topical Authority SEO: How to Dominate Entire Search Categories",
    content: [
      "Dominating a category requires more than just good content; it requires a silo architecture that maps out every entity relationship within the niche.",
      "By building comprehensive content clusters, you establish yourself as the topical authority, making it easier to rank for new keywords within that same category."
    ],
    focus: ["Content Clusters", "Silo Architecture", "Entity Relationships"]
  },
  "search-intent-mapping": {
    title: "Search Intent Mapping: Turning Queries Into Conversions",
    content: [
      "Understanding the flow from informational queries to transactional intent is crucial for conversion optimization. We map out the user journey to ensure that every search leads naturally into your sales funnel.",
      "Intent stacking allows us to capture users at multiple stages of the buying cycle, increasing the overall ROI of your SEO efforts."
    ],
    focus: ["Informational → Transactional Flow", "Intent Stacking", "Funnel Alignment"]
  },
  "semantic-seo": {
    title: "Semantic SEO: How Search Engines Understand Meaning, Not Just Keywords",
    content: [
      "Modern search engines use Natural Language Processing (NLP) to understand the context and meaning behind a query. We optimize for co-occurrence and contextual relevance to ensure your content aligns with how AI models process information.",
      "This goes beyond simple keyword matching and into the realm of entity-based understanding."
    ],
    focus: ["NLP", "Co-occurrence", "Contextual Relevance"]
  },
  "entity-based-seo": {
    title: "Entity-Based SEO: How Google Connects Brands, Services & Locations",
    content: [
      "Google's Knowledge Graph is built on entities and their relationships. By stacking entities and building strong relationship signals, we help search engines connect your brand to the services and locations you serve.",
      "This is particularly powerful for local SEO, where location-service entities are the primary ranking factor."
    ],
    focus: ["Knowledge Graph", "Entity Stacking", "Relationship Building"]
  },
  "query-expansion-strategy": {
    title: "Query Expansion Strategy: How to Rank for Thousands of Related Searches",
    content: [
      "Query expansion leverages 'People Also Ask' (PAA) data and long-tail variations to fan out your ranking potential. We identify the questions your audience is asking and build content that answers them directly.",
      "This strategy captures the 'long-tail' of search, which often accounts for the majority of high-converting traffic."
    ],
    focus: ["People Also Ask", "Long-tail Dominance", "Query Fan-out"]
  },
  "on-page-vs-authority": {
    title: "On-Page SEO vs Authority SEO: What Actually Moves Rankings Today",
    content: [
      "There is a common myth that on-page SEO is dead. In reality, it has evolved into a hybrid strategy that combines technical precision with authority-based signals.",
      "We break down the modern ranking factors to show what actually moves the needle in today's competitive landscape."
    ],
    focus: ["Myth-busting", "Modern Ranking Factors", "Hybrid Strategy"]
  },
  "ranking-system-2026": {
    title: "SEO Strategy: The Complete 2026 Ranking System for Local & National Results",
    content: [
      "The Gadgetlesstech Ranking System™ is a modern SEO framework built on semantic authority, query expansion, and page-level ranking signals.",
      "This system is designed to provide consistent results across both local and national markets, leveraging the latest advancements in AI and search technology."
    ],
    focus: ["Semantic Authority", "Query Expansion", "Page-level Signals"]
  }
};

export default function ClusterPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = clusterContent[slug || ""];

  const goToClusters = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("clusters")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  if (!data) return <div className="py-20 text-center">Topic not found.</div>;

  return (
    <div className="pt-32 pb-32 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={goToClusters} className="inline-flex items-center text-[12px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-12 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to System
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-4xl md:text-6xl font-black mb-12 leading-[1.1] text-white uppercase italic tracking-tighter">
            {data.title}
          </h1>

          <div className="flex flex-wrap gap-4 mb-16">
            {data.focus.map((f) => (
              <span key={f} className="px-5 py-2 bg-white/5 border border-white/5 text-white text-[12px] font-black uppercase tracking-widest rounded-md flex items-center shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                <CheckCircle2 className="mr-2 w-4 h-4 text-cyan-400" /> {f}
              </span>
            ))}
          </div>

          <div className="space-y-10 text-lg text-gray-400 font-medium">
            {data.content.map((p, i) => (
              <p key={i} className="leading-relaxed first-letter:text-4xl first-letter:font-black first-letter:text-cyan-400 first-letter:mr-2 first-letter:float-left">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-24 p-12 bg-white/5 rounded-[32px] border border-white/10 relative overflow-hidden backdrop-blur-sm">
            <div className="relative z-10">
              <h3 className="font-display text-3xl font-black mb-6 uppercase tracking-tighter italic text-white">DEATH TO THE STATUS QUO</h3>
              <p className="text-gray-500 mb-10 font-medium leading-relaxed max-w-2xl">
                The Gadgetlesstech Ranking System™ is designed to integrate these methodologies into a cohesive, high-performance SEO engine.
              </p>
              <Link to="/strategy" className="inline-flex items-center px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[12px] rounded-md hover:bg-cyan-400 transition-all shadow-xl">
                View Strategy Blueprint <ArrowLeft className="ml-3 w-4 h-4 rotate-180" />
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
