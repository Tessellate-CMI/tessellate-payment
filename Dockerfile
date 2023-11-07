FROM oven/bun:latest as base
WORKDIR /app

FROM base as install
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM install AS prerelease
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM base as release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/server.js .
COPY --from=prerelease /app/package.json .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "server.js" ]