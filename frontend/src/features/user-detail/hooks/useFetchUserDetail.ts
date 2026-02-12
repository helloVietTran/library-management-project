import { useQuery } from '@tanstack/react-query';
import api from '@/config/axios';
import queryKeys from '@/config/queryKey';
import { ApiResponse } from '@/interfaces/api-response';
import { User } from '@/interfaces/commom';

const fetchUserById = async (userId: string): Promise<ApiResponse<User>> => {
  const { data } = await api.get<ApiResponse<User>>(`/users/${userId}`);
  return data;
};

const useFetchUserDetail = (userId: string) => {
  return useQuery<ApiResponse<User>>({
    queryKey: [queryKeys.userDetail(userId), userId],
    queryFn: () => fetchUserById(userId),
    staleTime: 5 * 60 * 1000,  
    enabled: !!userId
  });
};

export default useFetchUserDetail;
