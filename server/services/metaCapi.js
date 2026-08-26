import crypto from 'crypto';
import fetch from 'node-fetch';

const GRAPH_VERSION = 'v21.0';

function sha256(value) {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export function generateEventId() {
  return crypto.randomUUID();
}

/**
 * Send one event to Meta's Conversions API. Pass the SAME eventId used for the
 * matching browser-side fbq() call so Meta dedupes the pixel + CAPI signal
 * instead of double-counting the conversion.
 */
export async function sendMetaCapiEvent({ eventName, eventId, req, email, customData }) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    console.warn(`[metaCapi] META_PIXEL_ID or META_CAPI_ACCESS_TOKEN not set — skipping ${eventName}`);
    return;
  }

  const userData = {
    client_ip_address: (req?.headers['x-forwarded-for'] || '').split(',')[0].trim() || req?.ip,
    client_user_agent: req?.headers['user-agent'],
  };
  if (email) userData.em = [sha256(email)];

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: req?.headers['referer'] || undefined,
        user_data: userData,
        custom_data: customData,
      },
    ],
  };

  // Only set while verifying in Events Manager > Test Events. Remove
  // META_CAPI_TEST_EVENT_CODE from the environment once confirmed working,
  // otherwise these events keep showing as test data instead of real traffic.
  if (process.env.META_CAPI_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error(`[metaCapi] ${eventName} failed ${res.status}: ${text}`);
    } else {
      console.log(`[metaCapi] ${eventName} sent (event_id=${eventId})`);
    }
  } catch (err) {
    console.error(`[metaCapi] ${eventName} error:`, err.message);
  }
}
