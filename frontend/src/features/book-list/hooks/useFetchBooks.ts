import { useQuery } from '@tanstack/react-query';

import api from '@/config/axios';
import queryKeys from '@/config/queryKey';
import { PaginatedResponse } from '@/interfaces/api-response';
import { Book } from '@/interfaces/commom';

const fetchBooks = async (page: number, pageSize: number, search?: string): Promise<PaginatedResponse<Book>> => {
  const { data } = await api.get<PaginatedResponse<Book>>('/books', {
    params: { page, pageSize, search },
  });
  return data;
};

const useFetchBooks = (page: number, pageSize: number, search?: string) => {
  return useQuery<PaginatedResponse<Book>>({
    queryKey: [queryKeys.BOOKS, page, pageSize, search],
    queryFn: () => fetchBooks(page, pageSize, search),
    placeholderData: (prevData) => prevData,
    staleTime: 5 * 60 * 1000,
  });
};

export default useFetchBooks;
