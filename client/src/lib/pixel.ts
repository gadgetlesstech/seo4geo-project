declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Generate an ID to pass to both the browser pixel call and the matching
 * server-side Conversions API call for the same conversion, so Meta dedupes
 * them instead of counting the event twice.
 */
export function generateEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Fire one of Meta's predefined standard events (PageView, Lead, Schedule, etc.) */
export function trackStandard(event: string, params?: Record<string, unknown>, eventId?: string) {
  window.fbq?.("track", event, params ?? {}, eventId ? { eventID: eventId } : undefined);
}

/** Fire a custom, non-standard event name (shows up in Events Manager as a custom conversion) */
export function trackCustom(event: string, params?: Record<string, unknown>, eventId?: string) {
  window.fbq?.("trackCustom", event, params ?? {}, eventId ? { eventID: eventId } : undefined);
}
