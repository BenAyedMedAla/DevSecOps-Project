const express = require('express');
// ⚠️ FAILLE VOLONTAIRE (TP DevSecOps) : import utilisé uniquement par la route vulnérable ci-dessous.
const { exec } = require('child_process');

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

// =============================================================================
// ⚠️ FAILLE VOLONTAIRE – NE PAS DÉPLOYER ⚠️
// Route ajoutée intentionnellement pour valider que le pipeline bloque le code
// vulnérable (TP « Intégration de la sécurité dans un pipeline CI/CD »).
//
// Vulnérabilité : injection de commande OS (CWE-78 / OWASP A03:2021 Injection).
// Le paramètre "host" est concaténé sans validation dans une commande shell :
//   GET /api/ping?host=127.0.0.1;cat /etc/passwd
// exécute aussi "cat /etc/passwd" sur le serveur.
// =============================================================================
app.get('/api/ping', (req, res) => {
  const host = req.query.host;
  exec(`ping -c 1 ${host}`, (error, stdout, stderr) => {
    res.type('text/plain').send(stdout + stderr);
  });
});

module.exports = app;
