import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/config/axios';
import { App } from 'antd';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';
import queryKeys from '@/config/queryKey';

const useUpdateUser = (userId?: string, handleCancel?: () => void) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: async (userData: FormData) => {
      return await api.put(`/users/${userId}`, userData);
    },
    onSuccess: () => {
      message.success({ content: 'Cập nhật thành công!', key: 'user' });
      queryClient.invalidateQueries({ queryKey: [queryKeys.USERS] });
      
      handleCancel?.();
    },
    onError: (err) => {
      const msg = handleErrResponseMsg(err, 'Cập nhật thất bại');
      console.log(err);
      message.error({
        content: msg,
        key: 'user',
      });
    },
  });
};

export default useUpdateUser;
