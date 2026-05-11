import Anthropic from '@anthropic-ai/sdk';

let _client;
function getClient() {
  if (!_client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY must be set');
    _client = new Anthropic({ apiKey });
  }
  return _client;
}

function scoreLabel(score) {
  if (score >= 80) return 'Strong';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  if (score >= 20) return 'Weak';
  return 'Critical';
}

export async function generateGapAnalysis(auditData) {
  const {
    url, keyword, city,
    crawlData, competitors, keywordData,
    domainOverview, seoCompetitors, rankedKeywords,
    backlinkSummary, technicalIssues, contentGap,
    scores,
  } = auditData;

  const domain = new URL(url).hostname.replace(/^www\./, '');
  const { aiData } = auditData;

  // Build content gap list — prefer rich data with volumes, fall back to basic keywords
  const gapKeywords = contentGap?.length
    ? contentGap.slice(0, 15).map(item => {
        const kw = item.keyword_data?.keyword ?? '';
        const vol = item.keyword_data?.keyword_info?.search_volume ?? 0;
        return vol ? `"${kw}" (${vol.toLocaleString()}/mo)` : `"${kw}"`;
      })
    : keywordData.keywordsUserIsMissing.slice(0, 10).map(k => `"${k}"`);

  const prompt = `You are a senior local SEO strategist. Analyze the data below and write a comprehensive SEO audit report. Be specific — cite real numbers from the data. Prioritize ruthlessly. No filler.

## TARGET BUSINESS
- URL: ${url}
- Domain: ${domain}
- Keyword: "${keyword}"
- City: ${city}

## SEO HEALTH SCORES (0–100)
| Dimension | Score | Rating |
|-----------|-------|--------|
| **OVERALL** | **${scores?.overall ?? 'N/A'}** | **${scoreLabel(scores?.overall ?? 0)}** |
| Keywords | ${scores?.keyword ?? 'N/A'} | ${scoreLabel(scores?.keyword ?? 0)} |
| Technical | ${scores?.technical ?? 'N/A'} | ${scoreLabel(scores?.technical ?? 0)} |
| Competitive | ${scores?.competitive ?? 'N/A'} | ${scoreLabel(scores?.competitive ?? 0)} |
| Content | ${scores?.content ?? 'N/A'} | ${scoreLabel(scores?.content ?? 0)} |
| Authority | ${scores?.authority ?? 'N/A'} | ${scoreLabel(scores?.authority ?? 0)} |
| AI Visibility | ${scores?.aiVisibility ?? 'N/A'} | ${scoreLabel(scores?.aiVisibility ?? 0)} |

## DOMAIN OVERVIEW
${domainOverview ? `- Estimated organic traffic: ${(domainOverview.metrics?.organic?.etv ?? 0).toLocaleString()}/mo
- Total ranking keywords: ${(domainOverview.metrics?.organic?.count ?? 0).toLocaleString()}
- Domain rank: ${domainOverview.rank ?? 'N/A'}/1000` : '- No overview data (new or very low-traffic domain)'}

## PAGE CRAWL
- Title: ${crawlData.title || '(MISSING)'}
- Meta Description: ${crawlData.metaDescription || '(MISSING)'}
- H1s: ${crawlData.h1s.join(', ') || '(none)'}
- H2s: ${crawlData.h2s.slice(0, 5).join(', ') || '(none)'}
- Internal Links: ${crawlData.internalLinkCount}

## TECHNICAL ISSUES
${(technicalIssues?.critical ?? []).length ? `🔴 Critical: ${technicalIssues.critical.join(' | ')}` : '✅ No critical issues'}
${(technicalIssues?.high ?? []).length ? `🟠 High: ${technicalIssues.high.join(' | ')}` : ''}
${(technicalIssues?.medium ?? []).length ? `🟡 Medium: ${technicalIssues.medium.join(' | ')}` : ''}

## BACKLINK PROFILE
${backlinkSummary ? `- Total backlinks: ${(backlinkSummary.backlinks ?? 0).toLocaleString()}
- Referring domains: ${(backlinkSummary.referring_domains ?? 0).toLocaleString()}
- Dofollow: ${(backlinkSummary.backlinks_dofollow ?? 0).toLocaleString()}
- Domain rank: ${backlinkSummary.rank ?? 0}/1000` : '- No backlink data available'}

## LOCAL PACK COMPETITORS
${competitors.map((c, i) => `${i + 1}. ${c.title ?? c.domain} (${c.domain}) — ${c.rating ?? 'N/A'}★, ${(c.reviews ?? 0).toLocaleString()} reviews`).join('\n')}

## ORGANIC SEO COMPETITORS (top by SERP overlap)
${seoCompetitors?.slice(0, 5).map(c =>
  `- ${c.domain}: ${(c.metrics?.organic?.count ?? 0).toLocaleString()} keywords, ~${(c.metrics?.organic?.etv ?? 0).toLocaleString()} traffic/mo`
).join('\n') || '- No data'}

## KEYWORD COVERAGE
- Ranks for "${keyword}": ${keywordData.userRanksForKeyword ? '✅ Yes' : '❌ No'}
- Total ranking keywords: ${keywordData.userKeywordCount}
${keywordData.competitors.map(c =>
  `- ${c.domain}: ${c.keywordCount} keywords, ${c.sharedWithUser} shared, ${c.uniqueToCompetitor} unique`
).join('\n')}

## TOP KEYWORD GAPS (competitors rank, you don't)
${gapKeywords.join('\n') || '- None identified'}

## AI & LLM VISIBILITY
- AI Visibility Score: ${scores?.aiVisibility ?? 'N/A'}/100 (${scoreLabel(scores?.aiVisibility ?? 0)})
- Domain cited in Google AI Overview / ChatGPT: ${aiData?.isCited ? '✅ YES — appearing in AI answers' : '❌ NO — invisible to AI search'}
- AI response appearances found: ${aiData?.llmMentions?.length ?? 0}
- Domains getting cited for "${keyword} ${city}" instead: ${aiData?.citingCompetitors?.join(', ') || 'none identified'}
- AI search volume for "${keyword}": ${aiData?.aiKeywordVolume?.[0]?.ai_search_volume?.toLocaleString() ?? 'N/A'}/mo
- AI search volume for "${keyword} ${city}": ${aiData?.aiKeywordVolume?.[1]?.ai_search_volume?.toLocaleString() ?? 'N/A'}/mo
${aiData?.llmMentions?.length ? `
Sample AI questions where domain was found:
${aiData.llmMentions.slice(0, 3).map(m => `- "${m.question ?? 'N/A'}" (AI volume: ${m.ai_search_volume?.toLocaleString() ?? '?'}/mo)`).join('\n')}` : ''}

---

## REPORT INSTRUCTIONS

Write the following sections in order. Use markdown. Be direct — numbers not adjectives.

### 1. Executive Summary
2–3 sentences. State the Overall score, the single biggest problem, and the single biggest opportunity.

### 2. Score Breakdown
One sentence per dimension score. Explain what drove it high or low using the data above.

### 3. Critical Issues
Bullet list of must-fix items (technical issues first, then content/keyword gaps). Each bullet: issue → specific impact → exact fix.

### 4. Quick Wins
3–5 changes achievable in under a week with high ROI. Be specific — name the exact page/element to change.

### 5. Keyword Opportunities
Top 5 keywords to target next. For each: keyword, estimated monthly volume if available, why it's winnable, recommended page/action.

### 6. Competitive Gap Analysis
Compare ${domain} against the top 2–3 organic competitors by name. Cite traffic/keyword gaps. What are they doing that you're not?

### 7. Backlink & Authority Strategy
Based on ${(backlinkSummary?.referring_domains ?? 0).toLocaleString()} referring domains and a domain rank of ${backlinkSummary?.rank ?? 0}/1000 — what's the priority link-building approach?

### 8. GEO & AI Visibility Strategy
AI Visibility Score is ${scores?.aiVisibility ?? 0}/100. Domain is ${aiData?.isCited ? 'ALREADY appearing' : 'NOT YET appearing'} in Google AI Overview / ChatGPT.
${aiData?.citingCompetitors?.length ? `Competitors being cited instead: ${aiData.citingCompetitors.join(', ')}.` : ''}
Provide 4–6 specific, actionable recommendations to improve AI citation rate:
- Content structure changes (FAQ sections, "best X in Y" pages, structured data types)
- E-E-A-T and authority signals needed
- Which existing pages to optimize for AI citation and how
- What the citing competitors are likely doing differently
- llms.txt or other AI-crawler-specific optimizations

### 9. 30-Day Action Plan
Numbered priority list. Specific, assignable tasks. Group by week if helpful.`;

  const client = getClient();
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  return message.content[0].text;
}
