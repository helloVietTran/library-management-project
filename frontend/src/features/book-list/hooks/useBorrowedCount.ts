import api from '@/config/axios';
import { useQuery } from '@tanstack/react-query';

import { CountResponse } from '../types/types';
import queryKeys from '@/config/queryKey';
import { ApiResponse } from '@/interfaces/api-response';

const getBorrowedCount = async (): Promise<ApiResponse<CountResponse>> => {
  const { data } = await api.get<ApiResponse<CountResponse>>('/borrow-return/count');
  return data;
};

const useBorrowedCount = () => {
  return useQuery<ApiResponse<CountResponse>>({
    queryKey: [queryKeys.BORROWED_COUNT],
    queryFn: getBorrowedCount,
    staleTime: 60 * 60 * 1000,
  });
};

export default useBorrowedCount;
