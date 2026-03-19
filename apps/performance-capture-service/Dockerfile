FROM node:18-slim AS base
WORKDIR /app
RUN npm install -g pnpm turbo
 
#BUILDER
FROM base AS builder
WORKDIR /app
COPY . .
RUN turbo prune --scope=performance-capture-service --docker
 
#INSTALLER
FROM base AS installer
WORKDIR /app
 
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
 
RUN pnpm install --frozen-lockfile
 
COPY --from=builder /app/out/full/ .
 
RUN pnpm turbo run build --filter=performance-capture-service
 
# RUNNER 
FROM node:18-slim AS runner
WORKDIR /app
 
RUN apt-get update && apt-get install -y curl
 
ENV NODE_ENV=production
 
COPY --from=installer /app .
 
EXPOSE 3005
 
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s \
CMD curl -f http://localhost:3005/api/performance/health || exit 1
 
CMD ["node","apps/performance-capture-service/dist/server.js"]
 