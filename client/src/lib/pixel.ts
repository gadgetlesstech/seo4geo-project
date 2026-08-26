declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire one of Meta's predefined standard events (PageView, Lead, Schedule, etc.) */
export function trackStandard(event: string, params?: Record<string, unknown>) {
  window.fbq?.("track", event, params);
}

/** Fire a custom, non-standard event name (shows up in Events Manager as a custom conversion) */
export function trackCustom(event: string, params?: Record<string, unknown>) {
  window.fbq?.("trackCustom", event, params);
}
