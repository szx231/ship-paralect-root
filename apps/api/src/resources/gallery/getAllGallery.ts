import { AppKoaContext, AppRouter } from 'types';

import { cloudStorageService } from 'services';

async function handler(ctx: AppKoaContext) {
  const { page } = ctx.query;
  const PER_PAGE = 5;

  const currentPage = typeof page === 'undefined' ? 0 : Number(page);

  const startIndex = currentPage * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;

  const paintings = await cloudStorageService.getAllPaintingGallery(startIndex, endIndex, currentPage);

  ctx.body = paintings;
}

export default (router: AppRouter) => {
  router.get('/generalGallery', handler);
};
