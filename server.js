require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set. Copy .env.example to .env and add your connection string.');
  process.exit(1);
}

const playerSchema = new mongoose.Schema(
  {
    empId: { type: String, required: true },
    empName: { type: String, required: true },
    sessionId: { type: Number, required: true },
    status: { type: String, default: 'In Progress' },
    gamesCompleted: { type: Number, default: 0 },
    timeTaken: { type: Number, default: 0 },
    startedAt: { type: String },
    sessionExpiresAt: { type: Number },
    finishedAt: { type: String },
    breakdown: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { collection: 'players' }
);

playerSchema.index({ empId: 1, sessionId: 1 }, { unique: true });

const Player = mongoose.model('Player', playerSchema);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/api/health', async (_req, res) => {
  const state = mongoose.connection.readyState;
  res.json({
    ok: state === 1,
    database: mongoose.connection.name,
    state: ['disconnected', 'connected', 'connecting', 'disconnecting'][state] || 'unknown',
  });
});

app.get('/api/players', async (_req, res) => {
  try {
    const players = await Player.find().sort({ startedAt: -1 }).lean();
    res.json({ players });
  } catch (err) {
    console.error('GET /api/players:', err.message);
    res.status(500).json({ error: 'Failed to load players' });
  }
});

app.post('/api/players', async (req, res) => {
  try {
    const p = req.body;
    if (!p?.empId || !p?.sessionId) {
      return res.status(400).json({ error: 'empId and sessionId are required' });
    }
    const player = await Player.findOneAndUpdate(
      { empId: p.empId, sessionId: p.sessionId },
      {
        empId: p.empId,
        empName: p.empName,
        sessionId: p.sessionId,
        status: p.status,
        gamesCompleted: p.gamesCompleted ?? 0,
        timeTaken: p.timeTaken ?? 0,
        startedAt: p.startedAt,
        sessionExpiresAt: p.sessionExpiresAt,
        finishedAt: p.finishedAt,
        breakdown: p.breakdown ?? {},
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();
    res.json({ player });
  } catch (err) {
    console.error('POST /api/players:', err.message);
    res.status(500).json({ error: 'Failed to save player' });
  }
});

app.delete('/api/players', async (_req, res) => {
  try {
    await Player.deleteMany({});
    res.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/players:', err.message);
    res.status(500).json({ error: 'Failed to clear players' });
  }
});

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      autoSelectFamily: false,
    });
    console.log(`MongoDB connected: ${mongoose.connection.name}`);
    app.listen(PORT, () => {
      console.log(`Gamethon running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

start();
