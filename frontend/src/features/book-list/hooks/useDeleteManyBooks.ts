import { Key } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import queryKeys from '@/config/queryKey';
import api from '@/config/axios';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';

const useDeleteManyBooks = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: async (bookIds: string[] | Key[]) => {
      return await api.delete('/books', { data: { bookIds } });
    },
    onSuccess: () => {
      message.success('Xóa sách thành công!');

      queryClient.invalidateQueries({ queryKey: [queryKeys.BOOKS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.BOOKS_COUNT] });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.BORROWED_TURN_STATS],
      });
    },
    onError: (err) => {
      const msg = handleErrResponseMsg(
        err,
        'Không thể xóa sách! Vui lòng thử lại.'
      );
      message.error({
        content: msg,
        key: 'delete-many-book-fail',
      });
    },
  });
};

export default useDeleteManyBooks;
