FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

COPY apps ./apps

COPY packages ./packages

RUN pnpm install

RUN pnpm --filter performance-capture-service build

EXPOSE 3005

CMD ["pnpm","--filter","performance-capture-service","start"]