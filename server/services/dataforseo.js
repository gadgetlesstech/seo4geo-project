import fetch from 'node-fetch';

const BASE_URL = 'https://api.dataforseo.com/v3';

function getAuthHeader() {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) throw new Error('DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD must be set');
  return 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64');
}

export async function dataForSEORequest(endpoint, payload) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DataForSEO ${res.status}: ${text}`);
  }

  const json = await res.json();

  const taskStatusCode = json.tasks?.[0]?.status_code;
  const taskStatusMessage = json.tasks?.[0]?.status_message;
  if (taskStatusCode !== 20000) {
    throw new Error(`DataForSEO task error: ${taskStatusMessage}`);
  }

  return json;
}

// Safe variant — returns null instead of throwing (used for enrichment calls where missing data is acceptable)
export async function safeDataForSEORequest(endpoint, payload) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { Authorization: getAuthHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.tasks?.[0]?.status_code !== 20000) return null;
    return json;
  } catch {
    return null;
  }
}

// Domain rank overview: organic traffic estimate, keyword count, domain rank
export async function getDomainOverview(domain) {
  const data = await safeDataForSEORequest('/dataforseo_labs/google/domain_rank_overview/live', [
    { target: domain, location_name: 'United States', language_code: 'en' },
  ]);
  return data?.tasks?.[0]?.result?.[0] ?? null;
}

// Top organic SEO competitors by SERP overlap
export async function getDomainCompetitors(domain, limit = 10) {
  const data = await safeDataForSEORequest('/dataforseo_labs/google/competitors_domain/live', [
    { target: domain, location_name: 'United States', language_code: 'en', limit },
  ]);
  return data?.tasks?.[0]?.result?.[0]?.items ?? [];
}

// Full ranked keywords with metadata (volume, difficulty, intent, position)
export async function getRankedKeywordsFull(domain, limit = 200) {
  const data = await safeDataForSEORequest('/dataforseo_labs/google/ranked_keywords/live', [{
    target: domain,
    location_name: 'United States',
    language_code: 'en',
    limit,
    order_by: ['keyword_data.keyword_info.search_volume,desc'],
  }]);
  return { items: data?.tasks?.[0]?.result?.[0]?.items ?? [] };
}

// Keywords a competitor ranks for that you don't (content gap)
export async function getContentGap(yourDomain, competitorDomain, limit = 50) {
  const data = await safeDataForSEORequest('/dataforseo_labs/google/domain_intersection/live', [{
    target1: competitorDomain,
    target2: yourDomain,
    intersections: false,
    location_name: 'United States',
    language_code: 'en',
    limit,
    order_by: ['keyword_data.keyword_info.search_volume,desc'],
  }]);
  return data?.tasks?.[0]?.result?.[0]?.items ?? [];
}

// Backlink profile summary
export async function getBacklinkSummary(domain) {
  const data = await safeDataForSEORequest('/backlinks/summary/live', [
    { target: domain, include_subdomains: true },
  ]);
  return data?.tasks?.[0]?.result?.[0] ?? null;
}

// Single-page technical audit (fast — no full crawl)
export async function getOnPageInstant(url) {
  const data = await safeDataForSEORequest('/on_page/instant_pages', [{
    url,
    check_spell: false,
    load_resources: false,
    enable_javascript: false,
    enable_browser_rendering: false,
  }]);
  return data?.tasks?.[0]?.result?.[0]?.items?.[0] ?? null;
}
