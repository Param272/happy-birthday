import { Router } from 'express';
import { compliments, messages } from '../data/compliments.js';

const router = Router();
let lovePoints = 0;

const randomFrom = (list) => list[Math.floor(Math.random() * list.length)];

router.get('/compliment', (_req, res) => {
  res.json({ compliment: randomFrom(compliments) });
});

router.get('/message', (_req, res) => {
  res.json({ message: randomFrom(messages) });
});

router.get('/score', (_req, res) => {
  res.json({ score: lovePoints });
});

router.post('/score', (req, res) => {
  const increment = Number(req.body?.increment ?? 1);
  if (Number.isNaN(increment) || increment <= 0) {
    return res.status(400).json({ error: 'increment must be a positive number' });
  }

  lovePoints += increment;
  return res.json({ score: lovePoints });
});

router.post('/score/reset', (_req, res) => {
  lovePoints = 0;
  res.json({ score: lovePoints });
});

export default router;
