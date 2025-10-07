import express from 'express';
import bodyParser from 'body-parser';
import quizRoutes from './routes/quizRoutes.js';
import * as store from './models/dataStore.js';

const app = express();
app.use(bodyParser.json());

app.use('/api/quizzes', quizRoutes);

// health
app.get('/health', (req, res) => res.json({ ok: true }));

// dev-only: reset endpoint (helps tests)
app.post('/__clear', (req, res) => { store.clearAll(); res.json({ ok: true }); });

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}

export default app; // for supertest
