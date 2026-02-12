import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import { GoShieldLock } from 'react-icons/go';
import { MdOutlineAlternateEmail } from "react-icons/md";

import AuthLogo from './components/AuthLogo';
import AuthTitle from './components/AuthTitle';
import AuthNavigation from './components/AuthNavigation';
import useRegister from './hooks/useRegister';
import { RegisterRequest } from './types/types';

function Register() {
  const [form] = Form.useForm();
  const registerMutation = useRegister();

  const onFinish = (values: RegisterRequest) => {
    registerMutation.mutate(values);
  };

  return (
    <>
      <AuthLogo />
      <AuthTitle label="Đăng ký" />

      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Chưa nhập email' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}
        >
          <Input
            prefix={<MdOutlineAlternateEmail />}
            size="large"
            placeholder="Nhập email của bạn"
          />
        </Form.Item>

        {/* Full Name */}
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[
            { required: true, message: 'Vui lòng điền họ và tên' },
            { min: 3, message: 'Họ và tên phải tối thiểu 3 ký tự' },
          ]}
        >
          <Input
            size="large"
            placeholder="Nhập họ và tên của bạn"
          />
        </Form.Item>

        {/* Date of Birth */}
        <Form.Item
          label="Ngày sinh"
          name="dob"
          rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
        >
          <DatePicker
            size="large"
            style={{ width: '100%' }}
            placeholder="Chọn ngày sinh"
            format="DD/MM/YYYY"
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: 'Vui lòng điền mật khẩu' },
            { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<GoShieldLock />}
            placeholder="Nhập mật khẩu của bạn"
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          label="Nhập lại mật khẩu"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng nhập lại mật khẩu' },
            { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Confirm password not match'));
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Nhập lại mật khẩu của bạn"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large">
          Đăng ký
        </Button>
      </Form>

      <AuthNavigation
        primaryLabel="Đăng nhập."
        primaryDescription="Đã có tài khoản?"
        primaryHref="/login"
      />
    </>
  );
}

export default Register;
