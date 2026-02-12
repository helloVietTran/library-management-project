import { useQuery } from '@tanstack/react-query';
import api from '@/config/axios';
import queryKeys from '@/config/queryKey';

const getCountCommentsByRating = async (bookId: string): Promise<any> => {
  const { data } = await api.get(`/comments/stats/${bookId}`);
  return data;
};

const useStatsRating = (bookId: string) => {
  return useQuery<any>({
    queryKey: [queryKeys.RATING_STATS, bookId],
    queryFn: () => getCountCommentsByRating(bookId),
    staleTime: 5 * 60 * 1000,
  });
};

export default useStatsRating;
