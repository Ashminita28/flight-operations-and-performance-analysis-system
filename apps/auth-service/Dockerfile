FROM node:18-slim AS base
WORKDIR /app
RUN npm install -g pnpm turbo
 
#BUILDER
FROM base AS builder
WORKDIR /app
COPY . .
RUN turbo prune --scope=auth-service --docker
 
#INSTALLER
FROM base AS installer
WORKDIR /app
 
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
 
RUN pnpm install --no-frozen-lockfile 
 
COPY --from=builder /app/out/full/ .
 
RUN pnpm turbo run build --filter=auth-service
 
# RUNNER 
FROM node:18-slim AS runner
WORKDIR /app
 
RUN apt-get update && apt-get install -y curl
 
ENV NODE_ENV=production
 
COPY --from=installer /app .

COPY --from=installer /app/packages/shared-config/src/swagger ./swagger
 
EXPOSE 3000
 
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s \
CMD curl -f http://localhost:3000/api/auth/health || exit 1
 
CMD ["node","apps/auth-service/dist/server.js"]
 