import multer from '@koa/multer';

import { cloudStorageService } from 'services';
import { Next, AppKoaContext, AppRouter } from 'types';

const upload = multer();

async function validator(ctx: AppKoaContext, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, {
    global: 'File cannot be empty',
  });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;
  const { file } = ctx.request;

  const painting = await cloudStorageService.uploadGallery(user, file);

  ctx.body = painting;
}

export default (router: AppRouter) => {
  router.post('/gallery', upload.single('file'), validator, handler);
};
