import { useQuery } from '@tanstack/react-query';
import api from '@/config/axios';
import { ApiResponse } from '@/interfaces/api-response';
import { Message } from '@/interfaces/commom';
import queryKeys from '@/config/queryKey';

const fetchMessages = async (otherUserId: string | null) => {
  const { data } = await api.get<ApiResponse<Message[]>>(
    `/messages/${otherUserId}`
  );
  return data;
};

const useFetchMessages = (otherUserId: string | null, enabled: boolean = true) => {
  return useQuery<ApiResponse<Message[]>>({
    queryKey: [queryKeys.MESSAGES, otherUserId],
    queryFn: () => fetchMessages(otherUserId),
    enabled: !!otherUserId && enabled,
    staleTime: 2 * 60 * 1000,
  });
};

export default useFetchMessages;
