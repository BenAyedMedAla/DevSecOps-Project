const express = require('express');

const app = express();

// Ne pas divulguer la technologie serveur (en-tête X-Powered-By: Express)
app.disable('x-powered-by');
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// GET /api/add?a=1&b=2 -> { "result": 3 }
app.get('/api/add', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (req.query.a === undefined || req.query.b === undefined || !Number.isFinite(a) || !Number.isFinite(b)) {
    return res.status(400).json({ error: 'Les paramètres a et b doivent être des nombres' });
  }

  return res.status(200).json({ result: a + b });
});


module.exports = app;
