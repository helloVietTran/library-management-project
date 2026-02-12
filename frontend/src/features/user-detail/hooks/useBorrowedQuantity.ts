import api from '@/config/axios';
import { ApiResponse } from '@/interfaces/api-response';
import { useQuery } from '@tanstack/react-query';
import { CountResponse } from '@/features/book-list/types/types';
import queryKeys from '@/config/queryKey'

const getBorrowedQuantity = async (
  userId: string
): Promise<ApiResponse<CountResponse>> => {
  const { data } = await api.get<ApiResponse<CountResponse>>(
    `/borrow-return/users/${userId}/count`
  );
  return data;
};

const useBorrowedQuantity = (userId: string) => {
  return useQuery<ApiResponse<CountResponse>>({
    queryKey: [queryKeys.readBooksOfUser(userId), userId],
    queryFn: () => getBorrowedQuantity(userId),
  });
};

export default useBorrowedQuantity;
