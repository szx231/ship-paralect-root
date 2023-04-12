import { useMutation } from 'react-query';

import queryClient from 'query-client';
import { apiService } from 'services';

import { userTypes } from 'resources/user';

export function useChangeLikeStatus<T>() {
  const changeLikeStatus = (data: T) => apiService.post('/account/switchLikeStatus', data);

  return useMutation<userTypes.User, unknown, T>(changeLikeStatus, {
    onSuccess: (data) => {
      queryClient.setQueryData(['like'], data);
    },
  });
}
