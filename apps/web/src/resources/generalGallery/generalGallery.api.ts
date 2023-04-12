import { useInfiniteQuery } from 'react-query';

import { apiService } from 'services';

const fetchAllPaitings = async (page = 1) => {
  const get = () => apiService.get(`/account/generalGallery?page=${page}`);
  const res = await get();

  return res;
};

export function useGetAllPainting(options?: {}, requestFunction = fetchAllPaitings) {
  return useInfiniteQuery(['generalGallery'], ({ pageParam = 0 }) => requestFunction(pageParam), {
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.nextPageToken || 0;
      }
    },
  });
}
