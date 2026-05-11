// Scoring formulas ported from the dataforseo-claude skill pack (zubair-trabzada/dataforseo-claude)
// Overall = 0.25*keywords + 0.25*technical + 0.20*competitive + 0.15*content + 0.15*authority

export function computeKeywordScore(rankedKeywords) {
  const items = rankedKeywords?.items ?? [];
  const count = items.length;
  if (count === 0) return 20;

  // Volume (0-30): log-scaled average search volume across top ranked keywords
  const volumes = items.map(i => i.keyword_data?.keyword_info?.search_volume ?? 0);
  const avgVol = volumes.reduce((a, b) => a + b, 0) / volumes.length;
  const volScore = Math.min(30, Math.round((Math.log10(avgVol + 1) / Math.log10(10000)) * 30));

  // Low-difficulty share (0-25): % of keywords with KD < 30
  const difficulties = items.map(i => i.keyword_data?.keyword_properties?.keyword_difficulty ?? 50);
  const lowDiffScore = Math.round((difficulties.filter(d => d < 30).length / count) * 25);

  // Intent diversity (0-15): up to 4 intent buckets present
  const intents = new Set(
    items.map(i => i.keyword_data?.search_intent_info?.main_intent).filter(Boolean)
  );
  const intentScore = Math.round((Math.min(intents.size, 4) / 4) * 15);

  // Long-tail breadth (0-15): share of 4+ word keywords, capped at 30%
  const ltRatio = items.filter(i => (i.keyword_data?.keyword ?? '').split(' ').length >= 4).length / count;
  const ltScore = Math.round((Math.min(ltRatio, 0.3) / 0.3) * 15);

  // CPC value (0-15): avg CPC scaled to $5 ceiling
  const avgCpc = items.map(i => i.keyword_data?.keyword_info?.cpc ?? 0).reduce((a, b) => a + b, 0) / count;
  const cpcScore = Math.round((Math.min(avgCpc, 5) / 5) * 15);

  return Math.min(100, volScore + lowDiffScore + intentScore + ltScore + cpcScore);
}

export function computeTechnicalScore(onPageItem) {
  if (!onPageItem) return 50;

  const checks = onPageItem.checks ?? {};
  const meta = onPageItem.meta ?? {};
  const timing = onPageItem.page_timing ?? {};
  const content = onPageItem.content ?? {};

  let score = 100;
  const criticalIssues = [];
  const highIssues = [];
  const mediumIssues = [];

  // Critical (-15 each, max -60)
  if (checks.no_index) { criticalIssues.push('Page is noindexed — invisible to Google'); score -= 15; }
  if (checks.is_4xx_code) { criticalIssues.push(`4xx client error (${onPageItem.status_code})`); score -= 15; }
  if (checks.is_5xx_code) { criticalIssues.push(`5xx server error (${onPageItem.status_code})`); score -= 15; }
  if (checks.canonical_to_redirect) { criticalIssues.push('Canonical URL points to a redirect'); score -= 15; }

  // High (-5 each, max -30)
  if (!meta.title) { highIssues.push('Missing page title tag'); score -= 5; }
  if (!meta.description) { highIssues.push('Missing meta description'); score -= 5; }
  if (checks.no_h1_tag) { highIssues.push('No H1 heading found'); score -= 5; }
  if (checks.is_redirect) { highIssues.push('Page is a redirect'); score -= 5; }
  if ((timing.time_to_interactive ?? 0) > 4000) { highIssues.push(`Slow page load — ${Math.round((timing.time_to_interactive ?? 0) / 1000)}s to interactive`); score -= 5; }
  if (checks.duplicate_title) { highIssues.push('Duplicate title detected across pages'); score -= 5; }
  if (checks.broken_links) { highIssues.push('Broken links on page'); score -= 5; }

  // Medium (-2 each)
  if (!checks.canonical) { mediumIssues.push('Missing canonical tag'); score -= 2; }
  if ((content.plain_text_word_count ?? 0) < 300) { mediumIssues.push(`Thin content — only ${content.plain_text_word_count ?? 0} words`); score -= 2; }
  if (checks.lorem_ipsum) { mediumIssues.push('Lorem ipsum placeholder text present'); score -= 2; }
  if (checks.no_favicon) { mediumIssues.push('No favicon set'); score -= 1; }

  return {
    score: Math.max(0, score),
    criticalIssues,
    highIssues,
    mediumIssues,
  };
}

export function computeCompetitiveScore(domainOverview, seoCompetitors) {
  if (!domainOverview || seoCompetitors.length === 0) return 25;

  const targetTraffic = domainOverview.metrics?.organic?.etv ?? 0;
  const avgCompetitorTraffic =
    seoCompetitors.slice(0, 10).reduce((sum, c) => sum + (c.metrics?.organic?.etv ?? 0), 0) /
    Math.min(seoCompetitors.length, 10);

  if (avgCompetitorTraffic === 0) return 50;

  // Score = how close you are to the average competitor's traffic
  return Math.min(100, Math.round((targetTraffic / avgCompetitorTraffic) * 100));
}

export function computeContentScore(rankedKeywords) {
  const items = rankedKeywords?.items ?? [];
  if (items.length === 0) return 20;

  // Cluster by first word (head term) of each keyword
  const clusters = {};
  for (const item of items) {
    const kw = item.keyword_data?.keyword ?? '';
    const head = kw.split(' ')[0].toLowerCase();
    if (head) {
      if (!clusters[head]) clusters[head] = [];
      clusters[head].push(item);
    }
  }

  const clusterList = Object.values(clusters);
  const total = clusterList.length;
  if (total === 0) return 20;

  // Strong cluster: 2+ keywords in top 10 positions AND max volume > 100
  const strong = clusterList.filter(group => {
    const top10 = group.filter(i => (i.ranked_serp_element?.serp_item?.rank_group ?? 100) <= 10).length;
    const maxVol = Math.max(...group.map(i => i.keyword_data?.keyword_info?.search_volume ?? 0));
    return top10 >= 2 && maxVol > 100;
  });

  // Missing cluster: all keywords ranked > 30
  const missing = clusterList.filter(group =>
    group.every(i => (i.ranked_serp_element?.serp_item?.rank_group ?? 100) > 30)
  );

  return Math.round(
    Math.min(100, Math.max(0,
      (strong.length / total) * 50 +
      (1 - missing.length / total) * 25 +
      25 // base for having any ranked content
    ))
  );
}

export function computeAuthorityScore(backlinkSummary) {
  if (!backlinkSummary) return 15;

  const refDomains = backlinkSummary.referring_domains ?? 0;
  const rank = backlinkSummary.rank ?? 0;
  const backlinks = backlinkSummary.backlinks ?? 0;
  const dofollow = backlinkSummary.backlinks_dofollow ?? 0;

  // Referring domains (0-30): log-scaled up to 1,000 domains
  const refScore = Math.min(30, Math.round((Math.log10(refDomains + 1) / Math.log10(1000)) * 30));

  // Domain rank (0-25): DataForSEO 0-1000 scale
  const rankScore = Math.round((rank / 1000) * 25);

  // Dofollow ratio in healthy band 50–80% (0-10)
  const dfRatio = backlinks > 0 ? dofollow / backlinks : 0;
  const dfScore = dfRatio >= 0.5 && dfRatio <= 0.8 ? 10 : Math.round(dfRatio * 10);

  // Base presence score (0-35): just for having any backlinks
  const base = backlinks > 10 ? 35 : backlinks > 0 ? 20 : 0;

  return Math.min(100, refScore + rankScore + dfScore + base);
}

export function computeCompositeScore({ keyword, technical, competitive, content, authority }) {
  return Math.round(
    0.25 * keyword +
    0.25 * technical +
    0.20 * competitive +
    0.15 * content +
    0.15 * authority
  );
}

// AI Visibility Score — how well the domain appears in Google AI Overview and ChatGPT responses.
// Scored independently of the 5 traditional dimensions.
export function computeAiVisibilityScore(llmMentions, llmTopDomains, mentionMetrics, userDomain) {
  let score = 0;

  // 1. Domain cited in any AI response? (0 or 35 points)
  const cited = llmMentions.some(item =>
    item.sources?.some(s => (s.domain ?? '').includes(userDomain))
  );
  if (cited) score += 35;

  // 2. Number of AI response appearances (0-25 points)
  score += Math.min(25, llmMentions.length * 5);

  // 3. Rank among top cited domains for the keyword (0-25 points)
  const rank = llmTopDomains.findIndex(d => (d.domain ?? '').includes(userDomain));
  if (rank >= 0) score += Math.max(0, 25 - rank * 3);

  // 4. Has aggregated AI impressions data (0-15 points)
  const impressions = mentionMetrics?.impressions ?? 0;
  if (impressions > 0) score += Math.min(15, Math.round(Math.log10(impressions + 1) / Math.log10(10000) * 15));

  return Math.min(100, score);
}
