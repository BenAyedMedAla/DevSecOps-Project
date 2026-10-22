# devsecops-tp2

API Node.js/Express minimale servant de support au TP « Intégration de la sécurité dans un pipeline CI/CD ».

## Routes

| Méthode | Route                  | Réponse                 |
|---------|------------------------|-------------------------|
| GET     | `/health`              | `{ "status": "ok" }`    |
| GET     | `/api/add?a=1&b=2`     | `{ "result": 3 }`       |

## Commandes

```bash
npm ci          # installation reproductible
npm run lint    # vérification statique (ESLint)
npm test        # tests unitaires Jest + couverture
npm start       # démarre l'API sur le port 3000
```
