import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

// Pairwise divergence
app.get('/api/pairwise', async (req, res) => {
  const { taxonA, taxonB } = req.query;
  try {
    const response = await fetch(
      `https://timetree.temple.edu/api/pairwise?taxonA=${encodeURIComponent(taxonA)}&taxonB=${encodeURIComponent(taxonB)}&field=age`
    );
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch pairwise data' });
  }
});

// Full timeline
app.get('/api/timeline', async (req, res) => {
  const { species } = req.query;
  try {
    const response = await fetch(
      `https://timetree.temple.edu/api/timeline/${encodeURIComponent(species)}`
    );
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch timeline data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Backend running at http://localhost:${PORT}`);
});
