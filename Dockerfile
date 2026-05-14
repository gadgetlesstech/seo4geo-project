FROM node:20-alpine AS builder
WORKDIR /app

# Install root deps (for build tooling)
COPY package*.json ./
RUN npm install

# Copy client and build it
COPY client/ ./client/

# Bake VITE_* vars into the Vite bundle at build time
ARG VITE_N8N_WEBHOOK_URL
RUN printf "VITE_N8N_WEBHOOK_URL=%s\n" "$VITE_N8N_WEBHOOK_URL" > .env

RUN cd client && npm install && npm run build

# --- Production image ---
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY server/ ./server/
COPY --from=builder /app/client/dist ./client/dist

EXPOSE 3000
CMD ["node", "server/index.js"]
