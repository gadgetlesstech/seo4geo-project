import { safeDataForSEORequest } from './dataforseo.js';

// Where the domain appears in Google AI Overview / ChatGPT responses (database lookup — fast)
export async function getLlmMentions(domain) {
  const data = await safeDataForSEORequest('/ai_optimization/llm_mentions/search/live', [{
    target: [{ domain }],
    platform: 'google',
    search_scope: 'any',
    limit: 10,
  }]);
  return data?.tasks?.[0]?.result?.[0]?.items ?? [];
}

// Which domains are most cited for a keyword in AI responses
export async function getLlmTopDomains(keyword) {
  const data = await safeDataForSEORequest('/ai_optimization/llm_mentions/top_domains/live', [{
    target: [{ keyword }],
    platform: 'google',
    limit: 10,
  }]);
  return data?.tasks?.[0]?.result?.[0]?.items ?? [];
}

// AI search volume — how often this keyword is asked in AI tools (vs traditional Google volume)
export async function getAiKeywordVolume(keywords) {
  const list = Array.isArray(keywords) ? keywords : [keywords];
  const data = await safeDataForSEORequest('/ai_optimization/ai_keyword_data/keywords_search_volume/live', [{
    keywords: list,
    location_name: 'United States',
    language_name: 'English',
  }]);
  return data?.tasks?.[0]?.result?.[0]?.items ?? [];
}

// Aggregated mention metrics for a domain (total impressions, mention count, citation rate)
export async function getLlmMentionMetrics(domain) {
  const data = await safeDataForSEORequest('/ai_optimization/llm_mentions/aggregated_metrics/live', [{
    target: [{ domain }],
    platform: 'google',
  }]);
  return data?.tasks?.[0]?.result?.[0] ?? null;
}
