# Image de base épinglée sur une version précise (jamais "latest").
FROM node:22.23.4-alpine3.24

ENV NODE_ENV=production
WORKDIR /app

# Dépendances de production uniquement, installées depuis le lockfile.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Le code appartient à root : l'utilisateur d'exécution ne peut pas le modifier.
COPY src/ ./src/

# Exécution avec l'utilisateur non root "node" fourni par l'image officielle.
USER node

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "src/server.js"]
