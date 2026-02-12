import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';
import api from '@/config/axios';
import queryKeys from '@/config/queryKey';
import { ApiResponse } from '@/interfaces/api-response';
import { Book } from '@/interfaces/commom';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';
import { UpdateBookRequest } from '../types/types';

export const useUpdateBook = (
  bookId: string,
  successHandler?: () => void
) => {
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
    mutationFn: async (bookData: UpdateBookRequest) => {
      // không gửi file
      const { file, ...filterBookData } = bookData;

      const response = await api.put<ApiResponse<Book>>(
        `/books/${bookId}`,
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
        content: 'Cập nhật sách thành công!',
        key: 'book-success',
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.BOOKS] });
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
