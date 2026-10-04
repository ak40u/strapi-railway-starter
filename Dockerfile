FROM node:22-bookworm-slim

ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
# The admin panel is compiled here, not at start, so a deploy goes live in seconds instead of
# rebuilding the panel inside the memory of a running service.
RUN npm run build

# Uploaded media lands in /app/public/uploads: the Railway volume is mounted exactly there.
EXPOSE 1337
CMD ["npm", "run", "start"]
