import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

const SYSTEM_INSTRUCTION =
  'You are the Gadgetlesstech SEO Assistant. You help users understand the Gadgetlesstech Ranking System™, which includes Keyword Compression, Topical Authority, Page Authority, and Query Expansion. Be professional, authoritative, and concise — keep spoken answers under 3 sentences. If the user wants to book a call or schedule a meeting, let them know they can click the calendar icon in this chat.';

// Text chat — receives full history so the model has conversation context
router.post('/message', async (req, res) => {
  const { history = [], message } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: { systemInstruction: SYSTEM_INSTRUCTION },
      history: history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
    });
    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (err) {
    console.error('[chat] error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
