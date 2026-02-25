FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

COPY apps ./apps

# COPY packages ./packages

RUN pnpm install

RUN pnpm --filter flight-service build

EXPOSE 3002

CMD ["pnpm","--filter","flight-service","start"]