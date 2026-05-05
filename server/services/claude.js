import Anthropic from '@anthropic-ai/sdk';

let _client;
function getClient() {
  if (!_client) {
    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) throw new Error('CLAUDE_API_KEY must be set');
    _client = new Anthropic({ apiKey });
  }
  return _client;
}

export async function generateGapAnalysis(auditData) {
  const { url, keyword, city, crawlData, competitors, keywordData } = auditData;

  const prompt = `You are a local SEO expert. Analyze the following audit data and generate a prioritized gap analysis report for the business.

## Target Business
- URL: ${url}
- Target Keyword: "${keyword}"
- City: ${city}

## Page Crawl Data
- Title: ${crawlData.title}
- Meta Description: ${crawlData.metaDescription || '(none)'}
- H1s: ${crawlData.h1s.join(', ') || '(none)'}
- H2s: ${crawlData.h2s.slice(0, 5).join(', ') || '(none)'}
- Internal Links Found: ${crawlData.internalLinkCount}

## Local Pack Competitors (top 3)
${competitors.map((c, i) => `${i + 1}. ${c.title} (${c.domain}) — ${c.rating ?? 'N/A'} stars, ${c.reviews ?? 'N/A'} reviews`).join('\n')}

## Keyword Coverage
- User ranks for "${keyword}": ${keywordData.userRanksForKeyword ? 'Yes' : 'No'}
- User total ranked keywords: ${keywordData.userKeywordCount}
${keywordData.competitors.map((c) => `- ${c.domain}: ${c.keywordCount} keywords, shares ${c.sharedWithUser} with user, ${c.ranksForKeyword ? 'ranks' : 'does not rank'} for target keyword`).join('\n')}

Top keywords user is missing (vs competitors):
${keywordData.keywordsUserIsMissing.slice(0, 10).join(', ')}

## Instructions
Generate a prioritized SEO gap analysis report with:
1. **Executive Summary** (2–3 sentences on overall SEO health)
2. **Critical Issues** (must-fix items with clear explanations)
3. **Quick Wins** (high-impact, low-effort improvements)
4. **Content Gaps** (keyword opportunities the user is missing)
5. **Competitive Advantages to Build** (what the competitors are doing well)
6. **Recommended Action Plan** (numbered priority list)

Be specific, actionable, and concise. Use markdown formatting.`;

  const client = getClient();
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });

  return message.content[0].text;
}
