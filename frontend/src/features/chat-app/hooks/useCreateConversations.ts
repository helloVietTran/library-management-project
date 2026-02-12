import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import api from '@/config/axios';
import { ApiResponse } from '@/interfaces/api-response';
import { Conversation } from '@/interfaces/commom';
import queryKeys from '@/config/queryKey';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';

interface CreateConversationRequest {
  recipientId: string;
}

const useCreateConversation = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Conversation>,
    Error,
    CreateConversationRequest
  >({
    mutationFn: async (payload) => {
      const { data } = await api.post<ApiResponse<Conversation>>(
        '/messages/conversations',
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      message.success(data.message || 'Tạo cuộc trò chuyện thành công');

      queryClient.invalidateQueries({ queryKey: [queryKeys.CONVERSATIONS] });
    },
    onError: (error) => {
      const msg = handleErrResponseMsg(error, 'Tạo cuộc trò chuyện thất bại');
      message.error(msg);
      console.error(error);
    },
  });
};

export default useCreateConversation;
