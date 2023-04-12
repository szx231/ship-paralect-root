#!/bin/sh

export NODE_ENV=prod
docker compose up -d mongo redis
(cd apps/api; npm run build)
(cd apps/web; npm run build)
(cd apps/api; pm2 start --name "api-server" dist/src/app.js)
(cd apps/web; pm2 start --name "wev-server" npm -- run serve)
