# Locali / API

Backend API for locali.


## Development

.env file with these contents:
```sh
LCL_USE_PRESETS=docker
LCL_DB__CONNECTION=postgres://postgres:postgres@localhost:5432/postgres
```

Then run the compose file at `/.docker/dev` with this command
```sh
docker compose up -d
```


## Command cheatsheet

- `npx prisma migrate dev` - run migrations or create one
- `npx prisma migrate reset` - reset database with seeding
- `pnpm dev` - run the development server
