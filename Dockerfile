# deps
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

#build
FROM node:18-alpine AS builder

ARG ENV_MODE

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

COPY .env.$ENV_MODE ./.env
RUN yarn build

#runner
FROM node:18-alpine AS runner

WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]

