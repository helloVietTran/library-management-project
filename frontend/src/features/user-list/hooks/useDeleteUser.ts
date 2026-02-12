import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

import api from '@/config/axios';
import queryKeys from '@/config/queryKey';

const useDeleteUser = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      return await api.delete(`/users/${userId}`);
    },
    onSuccess: () => {
      message.success({
        content: 'Xóa người dùng thành công!',
        key: 'deleteUser',
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.USERS] });

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.message || 'Có lỗi xảy ra! Vui lòng thử lại.';
      message.error({ content: errorMessage, key: 'deleteUser' });
    },
  });
};

export default useDeleteUser;
