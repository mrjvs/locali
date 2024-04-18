[![Locali](../../.github/cover.png)](https://github.com/mrjvs/locali)

# ⚡@repo/api

The API server for the Locali application.

# 🔥Tech stack

- Fastify
- @neato/config
- Prisma

# 🧬Development

Instructions on how to run for development are not yet ready.
Create an `.env` file at `/apps/api/.env` with these contents:
```sh
LCL_USE_PRESETS=docker
LCL_DB__CONNECTION=postgres://postgres:postgres@localhost:5432/postgres
```

Then run the compose file at `/.docker/dev` with this command to setup the complimentary services:
```sh
docker compose up -d
```

Then finally, spin up the dev server in `/apps/api`:
```sh
pnpm i
pnpm dev
```

> [!TIP]
> You must be running **NodeJS 20** and use `pnpm` for the package manager.

# 🥔Command cheatsheet

- `npx prisma migrate dev` - run migrations or create one
- `npx prisma migrate reset` - reset database with seeding
- `pnpm dev` - run the development server
