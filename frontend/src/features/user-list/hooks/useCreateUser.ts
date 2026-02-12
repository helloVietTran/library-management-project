import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import api from '@/config/axios';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';
import { CreateUserRequest } from '../types/types';
import queryKeys from '@/config/queryKey';

const useCreaterUser = (onSuccessCallback?: () => void) => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateUserRequest) => {
      console.log(data);
      const res = await api.post('/users', data);

      return res.data;
    },
    onSuccess: () => {
      message.success({
        content: 'Tạo mới thành công!',
        key: 'create-user',
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.USERS] });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err: any) => {
      console.log(err.response.data);
      const msg = handleErrResponseMsg(err, 'Tạo mới người dùng thất bại!');
      message.error({
        content: msg,
        key: 'sign-up',
      });
    },
  });
};

export default useCreaterUser;
