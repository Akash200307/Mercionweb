# syntax=docker/dockerfile:1

# ---- deps: install production-only dependencies ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- runtime: minimal image, non-root ----
FROM node:22-alpine AS runtime
ENV NODE_ENV=production \
    PORT=3001
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY server ./server

# Create the file-store directory and hand everything to the unprivileged node user.
RUN mkdir -p /app/server/data && chown -R node:node /app
USER node

EXPOSE 3001

# Uses Node's built-in fetch (Node 22) so no extra tooling is needed in the image.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3001)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server/index.js"]
