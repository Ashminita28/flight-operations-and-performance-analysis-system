FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./

COPY apps ./apps

RUN pnpm install

RUN pnpm --filter auth-service build

EXPOSE 3000

CMD ["pnpm","--filter","auth-service","start"]