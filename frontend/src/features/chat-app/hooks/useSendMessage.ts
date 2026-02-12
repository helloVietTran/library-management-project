import { useMutation } from '@tanstack/react-query';
import api from '@/config/axios';
import { ApiResponse } from '@/interfaces/api-response';
import { Message } from '@/interfaces/commom';
import { SendMessageRequest } from '../types/types';

const sendMessage = async (payload: SendMessageRequest) => {
    const { data } = await api.post<ApiResponse<Message>>('/messages', payload);
    return data;
  };
  
  const useSendMessage = () => {
    return useMutation<ApiResponse<Message>, Error, SendMessageRequest>({
      mutationFn: sendMessage,
    });
  };
  
  export default useSendMessage;
