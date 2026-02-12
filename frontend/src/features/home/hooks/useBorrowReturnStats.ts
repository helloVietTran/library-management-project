import api from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import { BorrowReturnStatsResponse } from '../types/types';
import queryKeys from '@/config/queryKey';

const getBorrowReturnStats = async (): Promise<BorrowReturnStatsResponse> => {
  const { data } = await api.get<BorrowReturnStatsResponse>(
    '/borrow-return/stats'
  );
  return data;
};

const useBorrowReturnStats = () => {
  return useQuery<BorrowReturnStatsResponse, Error>({
    queryKey: [queryKeys.BORROWED_TURN_STATS],
    queryFn: getBorrowReturnStats,
    staleTime: 0,
  });
};

export default useBorrowReturnStats;
