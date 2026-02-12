import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';

import api from '@/config/axios';
import { SendOverdueMailData } from '../types/types';

const useSendEmail = () => {
  const { message } = App.useApp();

  return useMutation({
    mutationFn: async (data: SendOverdueMailData) => {
      return await api.post('/email/send-overdue-email', data);
    },
    onSuccess: () => {
      message.success({
        content: 'Gửi email nhắc nhở thành công!',
        key: 'send-email',
      });
    },
    onError: () => {
      message.error({
        content: 'Gửi email thất bại! Vui lòng thử lại.',
        key: 'send-email',
      });
    },
  });
};

export default useSendEmail;
