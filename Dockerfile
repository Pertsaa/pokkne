FROM node:18.13.0-slim AS build
WORKDIR /pokkne
RUN apt-get -qy update && apt-get -qy install openssl
RUN npm install -g pnpm
ENV NODE_ENV=development
COPY . .
RUN pnpm install
RUN pnpm db:generate

FROM build as development
CMD ["pnpm", "run", "start:dev"]
