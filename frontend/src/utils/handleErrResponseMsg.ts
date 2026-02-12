import { ErrorResponse } from '@/interfaces/api-response';

export const handleErrResponseMsg = (
  error: ErrorResponse,
  defaultMsg: string
): string => {
  const statusCode = error?.status;
  const serverErrMsg = error?.response?.data?.message;

  switch (statusCode) {
    case 401:
      return 'Bạn không có quyền thực hiện hành động này.';
    default:
      return serverErrMsg || defaultMsg;
  }
};
