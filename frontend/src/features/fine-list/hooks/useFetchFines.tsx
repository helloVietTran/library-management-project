import { useQuery } from '@tanstack/react-query';
import api from '@/config/axios';
import queryKeys from '@/config/queryKey';
import { PaginatedResponse } from '@/interfaces/api-response';
import { Fine } from '@/interfaces/commom';

const fetchFines = async (
  page: number,
  pageSize: number,
  search?: string,
  paid?: string
): Promise<PaginatedResponse<Fine>> => {
  const { data } = await api.get('/fines', {
    params: { page, pageSize, search, paid },
  });
  return data;
};

const useFetchFines = (
  page: number,
  pageSize: number,
  search: string,
  paid: string
) => {
  return useQuery<PaginatedResponse<Fine>>({
    queryKey: [queryKeys.FINES, page, pageSize, search, paid],
    queryFn: () => fetchFines(page, pageSize, search, paid),
    placeholderData: (prevData) => prevData,
    staleTime: 5 * 60 * 1000,
    enabled: !!page && !!pageSize, 
  });
};

export default useFetchFines;
