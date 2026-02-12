import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import api from '@/config/axios';
import queryKeys from '@/config/queryKey'; 
import { ApiResponse } from '@/interfaces/api-response';
import { Comment } from '@/interfaces/commom';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';

export const useLikeComment = (commentId: string, successHandler?: () => void) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.put<ApiResponse<Comment>>(`/comments/${commentId}/like`);
      return response.data;
    },
    onSuccess: () => {
      message.success({
        content: 'Đã like bình luận!',
        key: 'comment-like-success',
      });

      queryClient.invalidateQueries({ queryKey: [queryKeys.COMMENTS] });

      if (successHandler) {
        successHandler();
      }
    },
    onError: (err: any) => {
      console.error(err);
      const msg = handleErrResponseMsg(err, 'Có lỗi xảy ra khi like bình luận.');
      message.error({
        content: msg,
        key: 'comment-like-error',
      });
    },
  });

  return mutation;
};
