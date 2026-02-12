import { useQuery } from '@tanstack/react-query';

import api from '@/config/axios';
import { CountResponse } from '../types/types';
import queryKeys from '@/config/queryKey';
import { ApiResponse } from '@/interfaces/api-response';

const getBooksCount = async (): Promise<ApiResponse<CountResponse>> => {
  const res = await api.get<ApiResponse<CountResponse>>('/books/count');
  return res.data;
};

const useBooksCount = () => {
  return useQuery<ApiResponse<CountResponse>>({
    queryKey: [queryKeys.BOOKS_COUNT],
    queryFn: getBooksCount,
    staleTime: 60 * 60 * 1000,
  });
};

export default useBooksCount;
