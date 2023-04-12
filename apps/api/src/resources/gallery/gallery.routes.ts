import { routeUtil } from 'utils';

import uploadGallery from './upload-gallery';
import getUserGallery from './getUserGallery';
import getAllGallery from './getAllGallery';
import switchLikeStatus from './switchLikeStatus';

const publicRoutes = routeUtil.getRoutes([getAllGallery]);

const privateRoutes = routeUtil.getRoutes([getAllGallery, uploadGallery, getUserGallery, switchLikeStatus]);

export default {
  publicRoutes,
  privateRoutes,
};
