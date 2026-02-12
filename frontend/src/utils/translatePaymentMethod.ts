import { PaymentMethod } from '@/interfaces/commom';

export function translatePaymentMethod(
  method: PaymentMethod | undefined
): string {
  if (!method) return 'Chưa thanh toán';

  switch (method) {
    case PaymentMethod.CASH:
      return 'Tiền mặt';
    case PaymentMethod.CARD:
      return 'Thẻ';
    case PaymentMethod.BANK_TRANSFER:
      return 'Chuyển khoản';
    default:
      return 'Không xác định';
  }
}
