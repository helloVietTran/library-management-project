import React from 'react';
import { Modal, Form, Select, message } from 'antd';

import useAuthStore from '@/store/authStore';
import useConfirmPaidFine from '../hooks/useConfirmPaidFine';

interface FineModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  fineId?: string;
}

const FineModal: React.FC<FineModalProps> = ({
  openModal,
  setOpenModal,
  fineId = '',
}) => {
  const [form] = Form.useForm();

  const { user } = useAuthStore();

  const confirmPaidFineMutation = useConfirmPaidFine(fineId, () => {
    form.resetFields();
    setOpenModal(false);
  });

  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        confirmPaidFineMutation.mutate(values);
      })
      .catch(() => {
        message.error('Vui lòng điền đầy đủ thông tin hợp lệ!');
      });
  };

  return (
    <Modal
      title={
        <h1 className="text-primary text-xl font-semibold mb-2 pb-2 border-b border-gray-300 text-center">
          Chọn phương thức thanh toán
        </h1>
      }
      open={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
        name="fineForm"
        initialValues={{
          paymentMethod: 'cash',
          collectorId: user?._id,
        }}
        requiredMark={false}
        className="space-y-4"
      >
        <Form.Item
          name="paymentMethod"
          label="Phương thức thanh toán"
          rules={[
            { required: true, message: 'Phương thức thanh toán là bắt buộc.' },
          ]}
        >
          <Select size="large" placeholder="Chọn phương thức thanh toán">
            <Select.Option value="cash">Tiền mặt</Select.Option>
            <Select.Option value="card">Thẻ ngân hàng</Select.Option>
            <Select.Option value="bank_transfer">
              Chuyển khoản ngân hàng
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="collectorId" hidden>
          <input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FineModal;
