import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import api from '@/config/axios';
import queryKeys from '@/config/queryKey';
import { ApiResponse, ErrorResponse } from '@/interfaces/api-response';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';

export const useDeleteComment = (
  commentId: string,
  successHandler?: () => void
) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.delete<ApiResponse<null>>(
        `/comments/${commentId}`
      );
      return response.data;
    },
    onSuccess: () => {
      message.success({
        content: 'Xóa bình luận thành công!',
        key: 'comment-delete-success',
      });

      queryClient.invalidateQueries({ queryKey: [queryKeys.COMMENTS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.RATING_STATS] });
      
      if (successHandler) {
        successHandler();
      }
    },
    onError: (err: ErrorResponse) => {
      console.error(err);
      const msg = handleErrResponseMsg(err, 'Có lỗi xảy ra khi xóa bình luận.');
      message.error({
        content: msg,
        key: 'comment-delete-error',
      });
    },
  });

  return mutation;
};
