FROM node:24-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl
RUN npm install --global pnpm@11.5.2

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/api/package.json apps/api/package.json
COPY packages/database packages/database
COPY packages/shared/package.json packages/shared/package.json

RUN pnpm install --frozen-lockfile

COPY apps/api apps/api
COPY packages packages
COPY turbo.json tsconfig.base.json ./

RUN pnpm --filter @CourseMap/database db:generate
RUN pnpm --filter api build

FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache openssl

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/packages/database ./packages/database
COPY --from=builder /app/packages/shared ./packages/shared

WORKDIR /app/apps/api

EXPOSE 3001

CMD ["node", "dist/main.js"]
