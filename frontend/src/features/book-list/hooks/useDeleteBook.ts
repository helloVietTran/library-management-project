import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import queryKeys from '@/config/queryKey';
import api from '@/config/axios';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';

const useDeleteBook = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: async (bookId: string) => {
      return await api.delete(`/books/${bookId}`);
    },
    onSuccess: () => {
      message.success('Xóa sách thành công!');
      queryClient.invalidateQueries({
        queryKey: [queryKeys.BOOKS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.BOOKS_COUNT],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.BORROWED_TURN_STATS],
      });
    },
    onError: (err) => {
      const msg = handleErrResponseMsg(
        err,
        'Xóa sách thất bại! Vui lòng thử lại sau.'
      );

      message.error(msg);
    },
  });
};

export default useDeleteBook;
