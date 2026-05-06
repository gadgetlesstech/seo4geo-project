#!/bin/bash
# Usage: bash deploy.sh
# Rsyncs source to VPS and builds/restarts the Docker container.

VPS_IP="148.230.95.195"
VPS_USER="root"
REMOTE_DIR="/var/www/seo4geo"

echo "==> Syncing files to VPS..."
rsync -avz \
  --exclude 'node_modules' \
  --exclude 'client/node_modules' \
  --exclude 'client/dist' \
  --exclude '.git' \
  --exclude '.env' \
  ./ ${VPS_USER}@${VPS_IP}:${REMOTE_DIR}/

echo "==> Copying .env to VPS..."
scp .env ${VPS_USER}@${VPS_IP}:${REMOTE_DIR}/.env

echo "==> Building and restarting container on VPS..."
ssh ${VPS_USER}@${VPS_IP} "cd ${REMOTE_DIR} && docker compose build --no-cache && docker compose up -d"

echo "==> Done. Site should be live at https://seo4geo.com"
