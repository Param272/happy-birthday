import express from 'express';
import cors from 'cors';
import birthdayRoutes from './routes/birthdayRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'birthday-api' });
});

app.use('/api', birthdayRoutes);

app.listen(PORT, () => {
  console.log(`🎂 Birthday backend running on http://localhost:${PORT}`);
});
