import api from '@/config/axios';
import { useQuery } from '@tanstack/react-query';

import { TimeBasedStatsResponse } from '../types/types';
import { ApiResponse } from '@/interfaces/api-response';
import queryKeys from '@/config/queryKey';

const getUsersCountThisAndLastMonth = async (): Promise<
  ApiResponse<TimeBasedStatsResponse>
> => {
  const res = await api.get<ApiResponse<TimeBasedStatsResponse>>(
    '/users/stats/new-users'
  );
  return res.data;
};

const useNewUserStats = () => {
  return useQuery<ApiResponse<TimeBasedStatsResponse>, Error>({
    queryKey: [queryKeys.NEW_USERS_STATS],
    queryFn: getUsersCountThisAndLastMonth,
    staleTime: 60 * 60 * 1000,
  });
};

export default useNewUserStats;
