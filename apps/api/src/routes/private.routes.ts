import mount from 'koa-mount';
import compose from 'koa-compose';

import { AppKoa } from 'types';
import { accountRoutes } from 'resources/account';
import { userRoutes } from 'resources/user';
import { galleryRoutes } from 'resources/gallery';

import auth from './middlewares/auth.middleware';

export default (app: AppKoa) => {
  app.use(mount('/account', compose([auth, accountRoutes.privateRoutes, galleryRoutes.privateRoutes])));
  app.use(mount('/users', compose([auth, userRoutes.privateRoutes])));
};
