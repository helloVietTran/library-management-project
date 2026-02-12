import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import api from '@/config/axios';
import queryKeys from '@/config/queryKey';
import { CreateBookRequest } from '../types/types';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';
import { ApiResponse } from '@/interfaces/api-response';
import { Book } from '@/interfaces/commom';

export const useCreateBook = (successHandler?: () => void) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  const uploadFile = async (bookId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    await api.put(`/upload/books/${bookId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const mutation = useMutation({
    mutationFn: async (bookData: CreateBookRequest) => {
      const { file, ...filterBookData } = bookData;

      const response = await api.post<ApiResponse<Book>>(
        '/books',
        filterBookData
      );
      // Nếu có file ảnh, gửi tiếp
      if (file && response.data.data) {
        await uploadFile(response.data.data._id, file);
      }

      return response.data;
    },
    onSuccess: () => {
      message.success({
        content: 'Thêm mới sách thành công!',
        key: 'book-success',
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.BOOKS] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.BORROWED_TURN_STATS] });
      if (successHandler) {
        successHandler();
      }
    },
    onError: (err: any) => {
      console.log(err);
      const msg = handleErrResponseMsg(err, 'Có lỗi xảy ra! Vui lòng thử lại.');
      message.error({
        content: msg,
        key: 'book-error',
      });
    },
  });

  return mutation;
};
