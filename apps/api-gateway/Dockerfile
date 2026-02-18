FROM node:20-alpine

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm build

EXPOSE 4000

CMD ["pnpm", "start"]
