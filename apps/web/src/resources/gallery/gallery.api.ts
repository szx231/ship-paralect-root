import { useInfiniteQuery, useMutation } from 'react-query';

import queryClient from 'query-client';

import { apiService } from 'services';

import { userTypes } from 'resources/user';

const fetchUserPaitings = async (page = 1) => {
  const get = () => apiService.get(`/account/gallery?page=${page}`);
  const res = await get();

  return res;
};

export function useGetUserPainting(options?: {}, requestFunction = fetchUserPaitings) {
  return useInfiniteQuery(['gallery'], ({ pageParam = 0 }) => requestFunction(pageParam), {
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.nextPageToken || 0;
      }
    },
  });
}

export function useUploadPainting<T>() {
  const uploadPainting = (data: T) => apiService.post('/account/gallery', data);

  return useMutation<userTypes.User, unknown, T>(['uploadPainting'], uploadPainting, {
    onSuccess: (data) => {
      queryClient.setQueryData('uploadPainting', data);
    },
  });
}
