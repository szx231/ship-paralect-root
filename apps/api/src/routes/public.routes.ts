import mount from 'koa-mount';
import compose from 'koa-compose';

import { AppKoa, AppRouter } from 'types';
import { accountRoutes } from 'resources/account';
import { galleryRoutes } from 'resources/gallery';

const healthCheckRouter = new AppRouter();
healthCheckRouter.get('/health', (ctx) => {
  ctx.status = 200;
});

export default (app: AppKoa) => {
  app.use(healthCheckRouter.routes());
  app.use(mount('/account', compose([accountRoutes.publicRoutes, galleryRoutes.publicRoutes])));
};
