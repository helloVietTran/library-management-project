import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';

import api from '@/config/axios';
import queryKeys from '@/config/queryKey';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';

interface PaidData {
  paymentMethod: 'cash' | 'card' | 'bank_transfer';
  collectorId: string;
}

const useConfirmPaidFine = (fineId: string, successCallback: () => void) => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: async (data: PaidData) => {
      const res = await api.put(`/fines/${fineId}/pay`, data);
      return res.data;
    },
    onSuccess: () => {
      message.success('Đã xác nhận thanh toán thành công!');
      queryClient.invalidateQueries({ queryKey: [queryKeys.FINES] });

      successCallback();
    },
    onError: (error: any) => {
      const msg = handleErrResponseMsg(error, "Thanh toán thất bại, có lỗi xảy ra.");
      console.error(error);

      message.error(msg);
    },
  });
};

export default useConfirmPaidFine;
