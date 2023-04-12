import multer from '@koa/multer';

import { cloudStorageService } from 'services';
import { Next, AppKoaContext, AppRouter } from 'types';
import { userService } from 'resources/user';

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

  const avatarUrl = await cloudStorageService.uploadAvatar(user._id, file);

  await userService.updateOne({ _id: user._id }, () => ({ avatarUrl: avatarUrl }));

  ctx.body = { ...userService.getPublic(ctx.state.user), isShadow: Boolean(ctx.state.isShadow), avatarUrl };
}

export default (router: AppRouter) => {
  router.post('/avatar', upload.single('file'), validator, handler);
};
