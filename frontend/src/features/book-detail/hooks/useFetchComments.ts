import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import api from '@/config/axios';
import { ApiResponse } from '@/interfaces/api-response';
import { Comment } from '@/interfaces/commom';
import queryKeys from '@/config/queryKey';

const fetchCommentsByBookId = async (bookId: string, sortBy: string | null) => {
  const { data } = await api.get<ApiResponse<Comment[]>>(
    `/comments/books/${bookId}`,
    {
      params: { sortBy },
    }
  );
  return data;
};

const useFetchComments = (bookId: string) => {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '1'; 

  return useQuery<ApiResponse<Comment[]>>({
    queryKey: [queryKeys.COMMENTS, bookId, sortBy],
    queryFn: () => fetchCommentsByBookId(bookId, sortBy),
    staleTime: 5 * 60 * 1000, 
  });
};

export default useFetchComments;
