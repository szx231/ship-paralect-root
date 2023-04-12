import { cloudStorageService } from 'services';
import { AppKoaContext, AppRouter } from 'types';

async function handler(ctx: AppKoaContext) {
  const data = ctx.request.body;
  const { user } = ctx.state;

  await cloudStorageService.switchLikeStatus(data as Record<string, string>, user._id);

  ctx.status = 200;
  ctx.body = 'OK';
}

export default (router: AppRouter) => {
  router.post('/switchLikeStatus', handler);
};
