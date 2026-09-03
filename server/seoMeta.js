const SITE_URL = (process.env.APP_URL || 'https://seo4geo.com').replace(/\/$/, '');

const DEFAULT_META = {
  title: 'Gadgetlesstech Ranking System™ — Free SEO Keyword Gap Audit',
  description: "See the exact keywords your competitors rank for that you don't. Run a free SEO audit and uncover your local ranking gaps in under 60 seconds.",
  image: '/og-default.png',
};

const ROUTE_META = {
  '/': DEFAULT_META,
  '/audit': {
    title: 'Free SEO Audit — Find Your Keyword Gaps | SEO4GEO',
    description: 'Enter your website and instantly see the keywords, technical issues, and backlink gaps holding you back from ranking above local competitors.',
    image: '/og-default.png',
  },
  '/roofing-ranking-gap': {
    title: 'Free Roofing Search Visibility Audit | SEO4GEO',
    description: "See how much of the roofing search market you're missing. Enter your website and uncover the exact keywords your competitors rank for that you don't.",
    image: '/og-roofing.png',
  },
  '/strategy': {
    title: 'The Gadgetlesstech Ranking System™',
    description: 'A proprietary 4-layer SEO framework built on semantic authority, query expansion, and page-level ranking signals — for local and national results.',
    image: '/og-default.png',
  },
  '/about': {
    title: 'About the Gadgetlesstech Ecosystem',
    description: 'Meet the team and the ecosystem of tools behind the Gadgetlesstech Ranking System™ — from free audits to full-service execution.',
    image: '/og-default.png',
  },
  '/contact': {
    title: 'Contact Us | Gadgetlesstech',
    description: 'Get in touch with the Gadgetlesstech team or book a free SEO strategy call.',
    image: '/og-default.png',
  },
  '/privacy': {
    title: 'Privacy Policy | Gadgetlesstech',
    description: 'Gadgetlesstech privacy policy — how we collect, use, and protect your data.',
    image: '/og-default.png',
  },
  '/terms': {
    title: 'Terms Of Service | Gadgetlesstech',
    description: 'Gadgetlesstech terms of service — the rules and conditions for using our tools and services.',
    image: '/og-default.png',
  },
};

// Mirrors client/src/pages/ClusterPage.tsx — kept as title + first content paragraph
// so crawlers get real per-article metadata instead of the generic homepage tags.
const CLUSTER_META = {
  'rank-without-backlinks': {
    title: 'How to Rank Without Backlinks Using Authority-Based SEO',
    description: 'Traditional SEO relies on backlink profiles, but 2026 has shifted toward semantic authority. Learn how topical silos and internal linking replace external validation.',
  },
  'compact-keyword-strategy': {
    title: 'The Compact Keyword Strategy: How to Cover Thousands of Search Variations',
    description: 'Keyword mapping stacks phrases so a single page can rank for hundreds of long-tail variations without content bloat.',
  },
  'page-level-seo-signals': {
    title: 'Page-Level SEO Signals: How Individual Pages Gain Ranking Power',
    description: 'Search engines increasingly weigh page-level signals over domain-wide authority. See how content depth and engagement triggers drive rankings.',
  },
  'topical-authority-seo': {
    title: 'Topical Authority SEO: How to Dominate Entire Search Categories',
    description: 'Dominating a category requires a silo architecture that maps every entity relationship within your niche.',
  },
  'search-intent-mapping': {
    title: 'Search Intent Mapping: Turning Queries Into Conversions',
    description: 'Map the flow from informational queries to transactional intent to capture users at every stage of the buying cycle.',
  },
  'semantic-seo': {
    title: 'Semantic SEO: How Search Engines Understand Meaning, Not Just Keywords',
    description: 'Modern search engines use NLP to understand context and meaning. Learn how to optimize for co-occurrence and contextual relevance.',
  },
  'entity-based-seo': {
    title: 'Entity-Based SEO: How Google Connects Brands, Services & Locations',
    description: "Google's Knowledge Graph is built on entities and relationships — especially powerful for local SEO.",
  },
  'query-expansion-strategy': {
    title: 'Query Expansion Strategy: How to Rank for Thousands of Related Searches',
    description: "Leverage 'People Also Ask' data and long-tail variations to fan out your ranking potential and capture high-converting traffic.",
  },
  'on-page-vs-authority': {
    title: 'On-Page SEO vs Authority SEO: What Actually Moves Rankings Today',
    description: 'On-page SEO isn’t dead — it has evolved into a hybrid strategy combining technical precision with authority-based signals.',
  },
  'ranking-system-2026': {
    title: 'SEO Strategy: The Complete 2026 Ranking System for Local & National Results',
    description: 'The Gadgetlesstech Ranking System™ is a modern SEO framework built on semantic authority, query expansion, and page-level ranking signals.',
  },
};

export function getRouteMeta(pathname) {
  if (ROUTE_META[pathname]) return ROUTE_META[pathname];

  const clusterMatch = pathname.match(/^\/cluster\/([^/]+)\/?$/);
  if (clusterMatch && CLUSTER_META[clusterMatch[1]]) {
    return { ...CLUSTER_META[clusterMatch[1]], image: '/og-default.png' };
  }

  return DEFAULT_META;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function renderHtmlForRoute(template, pathname) {
  const meta = getRouteMeta(pathname);
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const imageUrl = `${SITE_URL}${meta.image}`;
  const pageUrl = `${SITE_URL}${pathname}`;

  const metaTags = `
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${pageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="SEO4GEO" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
  </head>`;

  // Strip any static description/OG/Twitter/canonical tags baked into the template
  // (dev-mode defaults) so they aren't duplicated alongside the injected set below.
  const stripped = template
    .replace(/\s*<meta\s+name="description"[^>]*>\n?/i, '')
    .replace(/\s*<meta\s+property="og:[^"]*"[^>]*>\n?/gi, '')
    .replace(/\s*<meta\s+name="twitter:[^"]*"[^>]*>\n?/gi, '')
    .replace(/\s*<link\s+rel="canonical"[^>]*>\n?/i, '');

  return stripped
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace('</head>', metaTags);
}
