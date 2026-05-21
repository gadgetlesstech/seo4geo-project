import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import analyzeRouter from './routes/analyze.js';
import mapsRouter from './routes/maps.js';
import gapRouter from './routes/gap.js';
import calendarRouter from './routes/calendar.js';
import auditLimitRouter from './routes/auditLimit.js';
import chatRouter from './routes/chat.js';
import leadsRouter from './routes/leads.js';
import { setupLiveProxy } from './routes/liveProxy.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(join(__dirname, '../client/dist')));

app.use('/api/analyze', analyzeRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/audit-limit', auditLimitRouter);
app.use('/api/maps', mapsRouter);
app.use('/api/gap', gapRouter);
app.use('/api', calendarRouter);
app.use('/auth', calendarRouter);

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../client/dist/index.html'));
});

const httpServer = app.listen(PORT, () => {
  console.log(`seo4geo server running on port ${PORT}`);
});
setupLiveProxy(httpServer);
