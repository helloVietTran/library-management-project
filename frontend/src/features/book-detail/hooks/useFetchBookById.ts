import api from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/config/queryKey';
import { ApiResponse } from '@/interfaces/api-response';
import { Book } from '@/interfaces/commom';

const fetchBookById = async (bookId: string): Promise<ApiResponse<Book>> => {
  const { data } = await api.get<ApiResponse<Book>>(`/books/${bookId}`);
  return data;
};

const useFetchBookById = (bookId: string) => {
  return useQuery<ApiResponse<Book>>({
    queryKey: [queryKeys.bookDetail(bookId), bookId],
    queryFn: () => fetchBookById(bookId),
    staleTime: 5 * 60 * 1000,
    enabled: !!bookId, 
  });
};

export default useFetchBookById;
