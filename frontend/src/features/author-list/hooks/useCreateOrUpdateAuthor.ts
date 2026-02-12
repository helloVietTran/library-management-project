import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';

import queryKeys from '@/config/queryKey';
import api from '@/config/axios';

const useCreateOrUpdateAuthor = (authorId?: string, successCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (authorId) {
        return await api.put(`/authors/${authorId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      return await api.post('/authors', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      message.success({
        content: authorId ? 'Cập nhật thành công!' : 'Thêm mới thành công!',
        key: 'author',
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.AUTHORS] });

      if (successCallback) successCallback();
    },
    onError: (err) => {
      console.log(err);
      message.error({
        content: 'Có lỗi xảy ra! Vui lòng thử lại.',
        key: 'author',
      });
    },
  });

  return mutation;
};

export default useCreateOrUpdateAuthor;
