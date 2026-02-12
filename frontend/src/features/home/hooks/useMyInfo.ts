import api from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/config/queryKey';
import { ApiResponse } from '@/interfaces/api-response';
import { User } from '@/interfaces/commom';

const getMyInfo = async (): Promise<ApiResponse<User>> => {
  const { data } = await api.get<ApiResponse<User>>(
    '/users/my'
  );
  return data;
};

const useMyInfo = () => {
  return useQuery<ApiResponse<User>, Error>({
    queryKey: [queryKeys.MY_INFO],
    queryFn: getMyInfo,
    staleTime: 60 * 60 * 1000,
  });
};

export default useMyInfo;
