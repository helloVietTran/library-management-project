import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';

import api from '@/config/axios';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { saveAuthToSession } from '@/utils/auth';
import { LoginRequest, LoginResponse } from '../types/types';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';

const useLogin = () => {
  const { message } = App.useApp();
  const { login: loginAction } = useAuthStore();
  const router = useRouter();

  return useMutation<LoginResponse, unknown, LoginRequest>({
    mutationFn: async (data) => {
      const res = await api.post('/auth/login', data);

      return res.data;
    },
    onSuccess: (data) => {
      message.success({
        content: 'Đăng nhập thành công!',
        key: 'login-success',
      });
      saveAuthToSession({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      router.push('/');
      loginAction(data.user);
    },
    onError: (err: any) => {
      const msg = handleErrResponseMsg(
        err,
        'Tài khoản hoặc mật khẩu không đúng'
      );
      message.error({
        content: msg,
        key: 'login-fail',
      });
    },
  });
};

export default useLogin;
