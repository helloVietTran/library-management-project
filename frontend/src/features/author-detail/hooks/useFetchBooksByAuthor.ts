import api from '@/config/axios';
import { ApiResponse } from '@/interfaces/api-response';
import { Book } from '@/interfaces/commom';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/config/queryKey';

const fetchBooksByAuthor = async (authorId: string): Promise<ApiResponse<Book[]>> => {
  const { data } = await api.get<ApiResponse<Book[]>>(`/books/authors/${authorId}`);
  return data;
};

const useFetchBooksByAuthor = (authorId: string) => {
  return useQuery<ApiResponse<Book[]>>({
    queryKey: [queryKeys.allBooksByAuthor(authorId), authorId],
    queryFn: () => fetchBooksByAuthor(authorId),
    staleTime: 5 * 60 * 1000,
    enabled: !!authorId,
  });
};

export default useFetchBooksByAuthor;
