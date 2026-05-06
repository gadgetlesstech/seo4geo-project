FROM node:20-alpine AS builder
WORKDIR /app

# Install root deps (for build tooling)
COPY package*.json ./
RUN npm install

# Copy client and build it
COPY client/ ./client/

# Create .env at /app so vite.config.js (envDir: '..') can read it
ARG GEMINI_API_KEY
ARG VITE_GEMINI_API_KEY
RUN printf "GEMINI_API_KEY=%s\nVITE_GEMINI_API_KEY=%s\n" "$GEMINI_API_KEY" "$VITE_GEMINI_API_KEY" > .env

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
