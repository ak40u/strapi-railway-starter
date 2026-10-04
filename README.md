# Strapi starter for Railway

Strapi 5, the open-source headless CMS, on Postgres, with uploaded media on a volume that is
mounted where Strapi actually writes it.

## Why this exists

The common Strapi template on Railway mounts its volume at `/public/uploads`. The app runs from
`/app`, and Strapi's local upload provider writes to `<app root>/public/uploads`, that is
`/app/public/uploads`. Every image uploaded through the admin panel goes to the container's own
disk, next to an empty volume, and disappears on the next deploy.

Here:

- **The volume path matches**: `/app/public/uploads`.
- **The admin panel is built into the image** (`npm run build` in the Dockerfile), so a deploy goes
  live in seconds instead of compiling the panel inside a running service.
- **Behind Railway's proxy**: `proxy.koa` trusts `X-Forwarded-*`, so Strapi knows requests arrive
  over https, and `PUBLIC_URL` gives the admin panel and media URLs the real domain.
- **The start command is in the Dockerfile**, not in `railway.json`, which Railway no longer
  reads for services created from a template.

## Setup

Deploy the template and open `/admin` to create the first administrator.

## Variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection, from the template's Postgres |
| `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY` | generated secrets |
| `PUBLIC_URL` | the public address, `https://<your-domain>` |

## Develop locally

```bash
npm install
DATABASE_CLIENT=sqlite npm run develop
```

## License

MIT. Strapi is MIT-licensed (Community Edition).
