import { useQuery } from '@tanstack/react-query';

import api from '@/config/axios';
import { BorrowedCountStatsResponse } from '../types/types';
import queryKeys from '@/config/queryKey';

const getBorrowedCountStats = async (): Promise<
  BorrowedCountStatsResponse[]
> => {
  const res = await api.get<BorrowedCountStatsResponse[]>(
    '/books/stats?by=borrowedTurn'
  );

  return res.data;
};

const useBorrowedCountStats = () => {
  return useQuery<BorrowedCountStatsResponse[]>({
    queryKey: [queryKeys.BORROWED_TURN_STATS],
    queryFn: getBorrowedCountStats,
    staleTime: 0,
  });
};

export default useBorrowedCountStats;
