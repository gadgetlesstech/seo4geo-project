import { Router } from 'express';
import { google } from 'googleapis';

const router = Router();

function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.APP_URL}/auth/callback`
  );
}

router.get('/auth/url', (req, res) => {
  const client = getOAuthClient();
  const url = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.readonly'],
    prompt: 'consent',
  });
  res.json({ url });
});

router.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('Missing authorization code');

  try {
    const client = getOAuthClient();
    const { tokens } = await client.getToken(code);

    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage(
                { type: 'OAUTH_AUTH_SUCCESS', tokens: ${JSON.stringify(tokens)} },
                '*'
              );
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. This window will close automatically.</p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('OAuth callback error:', err.message);
    res.status(500).send('Authentication failed. Please try again.');
  }
});

router.post('/calendar/events', async (req, res) => {
  const { tokens } = req.body;
  if (!tokens) return res.status(401).json({ error: 'No tokens provided' });

  const auth = new google.auth.OAuth2();
  auth.setCredentials(tokens);
  const calendar = google.calendar({ version: 'v3', auth });

  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    res.json(response.data.items ?? []);
  } catch (err) {
    console.error('Calendar events error:', err.message);
    res.status(500).json({ error: 'Failed to fetch calendar events' });
  }
});

export default router;
