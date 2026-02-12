import { useQuery } from '@tanstack/react-query';
import api from '@/config/axios';
import { PaginatedResponse } from '@/interfaces/api-response';
import { User } from '@/interfaces/commom';
import queryKeys from '@/config/queryKey';

const fetchUsers = async (
  page: number,
  pageSize: number,
  search?: string
): Promise<PaginatedResponse<User>> => {
  const { data } = await api.get<PaginatedResponse<User>>('/users', {
    params: { page, pageSize, search },
  });
  return data;
};

const useFetchUsers = (
  page: number,
  pageSize: number,
  search: string
) => {
  return useQuery<PaginatedResponse<User>>({
    queryKey: [queryKeys.USERS, page, pageSize, search],
    queryFn: () => fetchUsers(page, pageSize, search),
    staleTime: 5 * 60 * 1000, 
  });
};

export default useFetchUsers;
