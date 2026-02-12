import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import api from '@/config/axios';
import { RegisterResponse, RegisterRequest } from '../types/types';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { saveAuthToSession } from '@/utils/auth';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';

const useRegister = () => {
    const { message } = App.useApp();
    const { login: loginAction } = useAuthStore();
    const router = useRouter();

    return useMutation<RegisterResponse, unknown, RegisterRequest>({
        mutationFn: async (data) => {
            const res = await api.post('/auth/register', data);

            return res.data;
        },
        onSuccess: (data) => {
            message.success({
                content: "Đăng ký thành công!",
                key: 'register-success',
            });
            saveAuthToSession({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });
            router.push('/');
            loginAction(data.user);
        },
        onError: (err: any) => {
            const msg = handleErrResponseMsg(err, 'Đăng ký thất bại!');
            message.error({
                content: msg,
                key: 'register-fail',
            });
        },
    });

};

export default useRegister;
