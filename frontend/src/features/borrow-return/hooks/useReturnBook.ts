import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';

import api from '@/config/axios';
import queryKeys from '@/config/queryKey';
import { ReturnBookData } from '../types/types';

const useReturnBook = (recordId?: string, onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: async (returnData: ReturnBookData) => {
      return await api.put(`/borrow-return/${recordId}`, returnData);
    },
    onSuccess: () => {
      message.success({ content: 'Nhận sách thành công!', key: 'returnBook' });
      queryClient.invalidateQueries({ queryKey: [queryKeys.BORROW_RECORDS] });

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (err) => {
      console.log(err);
      message.error({
        content: 'Có lỗi xảy ra! Vui lòng thử lại.',
        key: 'returnBook',
      });
    },
  });
};

export default useReturnBook;
