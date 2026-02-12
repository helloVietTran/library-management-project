import React, { useEffect, useCallback } from 'react';
import { Modal, Form, Input, App, DatePicker } from 'antd';
import dayjs from 'dayjs';

import api from '@/config/axios';
import { ApiResponse } from '@/interfaces/api-response';
import { User } from '@/interfaces/commom';
import useUpdateUser from '../hooks/useUpdateUser';
import convertToFormData from '@/utils/convertFormData';

interface UpdateUserModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  userId?: string;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  openModal,
  setOpenModal,
  userId,
}) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const fetchUserData = useCallback(async () => {
    if (userId) {
      try {
        const res = await api.get<ApiResponse<User>>(`/users/${userId}`);
        const userData = res.data.data;

        form.setFieldsValue({
          ...userData,
          dob: userData.dob ? dayjs(userData.dob) : dayjs()
        });

      } catch {
        message.error('Lỗi khi tải thông tin người dùng.');
      }
    }
  }, [userId, form, message]);

  useEffect(() => {
    if (userId)
      fetchUserData();
    else {
      form.resetFields();
    }
  }, [userId, fetchUserData, form]);

  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  const updateMutation = useUpdateUser(userId, handleCancel);

  const handleSubmit = async () => {
    form
      .validateFields()
      .then((values) => {
        // lọc bỏ email 
        const { email, ...filteredValues } = values;

        filteredValues.dob = filteredValues.dob.format('YYYY-MM-DD');
        const formData = convertToFormData(filteredValues);

        updateMutation.mutate(formData);

      })
      .catch(() => {
        message.error('Vui lòng điền đầy đủ thông tin hợp lệ!');
      });
  };

  return (
    <Modal
      width={600}
      title={
        <h3 className="text-primary font-semibold text-xl pb-2 border-b">
          Chỉnh sửa thông tin người dùng
        </h3>
      }
      open={openModal}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Lưu"
      cancelText="Hủy"
      centered
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="space-y-4"
        requiredMark={false}
        initialValues={{
          fullName: "",
          dob: null,
          file: null,

        }}
      >
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[
            { required: true, message: 'Họ và tên là bắt buộc' },
            { min: 3, message: 'Họ và tên phải có ít nhất 3 ký tự' },
            { max: 100, message: 'Họ và tên không được vượt quá 100 ký tự' },
          ]}
        >
          <Input placeholder="Nhập họ và tên" size="large" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input disabled size="large" />
        </Form.Item>

        <Form.Item
          name="dob"
          label="Ngày sinh"
          rules={[{ required: true, message: 'Ngày sinh là bắt buộc' }]}
        >
          <DatePicker
            size="large"
            format="DD-MM-YYYY"
            disabledDate={(current) => current && current > dayjs().endOf('day')}
          />
        </Form.Item>

        <Form.Item
          name="file"
          label="Avatar"
          valuePropName="file"
          getValueFromEvent={(e) => e?.target?.files?.[0]}
        >
          <Input size="large" type="file" accept="image/*" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUserModal;
