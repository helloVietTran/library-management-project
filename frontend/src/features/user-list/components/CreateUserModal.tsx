import React from 'react';
import { Modal, Form, Input, DatePicker, App } from 'antd';

import dayjs from 'dayjs';
import useCreaterUser from '../hooks/useCreateUser';

interface CreateUserModalProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ openModal, setOpenModal }) => {
    const { message } = App.useApp();
    const [form] = Form.useForm();

    const handleCancel = () => {
        form.resetFields();
        setOpenModal(false);
    };
    const createUser = useCreaterUser(handleCancel);

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                values.dob = values.dob.format('YYYY-MM-DD');
                
                createUser.mutate(values);
            })
            .catch(() => {
                message.error('Vui lòng điền đầy đủ thông tin hợp lệ!');
            });
    };

    return (
        <Modal
            title={
                <>
                    <h1 className="text-primary text-xl font-semibold mb-2 pb-2 border-b border-gray-300 text-center">
                        Tạo người dùng Mới
                    </h1>
                    <p className="text-sm text-gray-500 text-center">
                        <span>(Mật khẩu mặc định là ngày sinh của người dùng dưới dạng ddmmyyyy)</span>
                    </p>
                </>
            }
            open={openModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Tạo"
            cancelText="Hủy"
        >
            <Form
                form={form}
                layout="vertical"
                name="createUserForm"
                initialValues={{
                    dob: dayjs(),
                }}
                requiredMark={false}
                className="space-y-4"
            >
                <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Họ và tên là bắt buộc' }]}
                >
                    <Input placeholder="Nhập họ và tên" size='large' />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]}
                >
                    <Input placeholder="Nhập email" size='large' />
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
            </Form>
        </Modal>
    );
};

export default CreateUserModal;
