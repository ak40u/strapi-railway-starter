module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // The public address, so the admin panel and generated media URLs use https and the real
  // domain rather than the container's own address.
  url: env('PUBLIC_URL', ''),
  // Railway terminates TLS at its edge and forwards plain HTTP: trust X-Forwarded-* so that
  // Strapi knows the request was https (secure cookies for the admin panel depend on it).
  proxy: { koa: env.bool('IS_PROXIED', true) },
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
