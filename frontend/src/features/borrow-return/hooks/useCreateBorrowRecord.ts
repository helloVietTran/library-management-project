import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';

import api from '@/config/axios';
import queryKeys from '@/config/queryKey';
import { CreateBorrowRecordData } from '../types/types';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';

export const useCreateBorrowRecord = (successHandler: () => void) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: async (borrowData: CreateBorrowRecordData) => {
      return await api.post('/borrow-return', borrowData);
    },
    onSuccess: () => {
      message.success({ content: 'Chon mượn sách thành công!', key: 'borrow' });
      queryClient.invalidateQueries({ queryKey: [queryKeys.BORROW_RECORDS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.MONTHLY_BORROW_RECORD_STATS] });

      successHandler();
    },
    onError: (error) => {
      const msg = handleErrResponseMsg(error, 'Có lỗi xảy ra! Vui lòng thử lại sau.');

      message.error({
        content: msg,
        key: 'borrow',
      });
    },
  });
};
