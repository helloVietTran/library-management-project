import React from 'react';
import { Form, Input, Button } from 'antd';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";

import AuthLogo from './components/AuthLogo';
import AuthTitle from './components/AuthTitle';
import AuthNavigation from './components/AuthNavigation';
import useLogin from './hooks/useLogin';
import { LoginRequest } from './types/types';

function Login() {
  const [form] = Form.useForm();
  const loginMutation = useLogin();

  const handleSubmit = (values: LoginRequest) => {
    loginMutation.mutate(values);
  };

  return (
    <>
      <AuthLogo />
      <AuthTitle label="Đăng nhập" />

      <Form
        size="large"
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        initialValues={{
          email: 'admin@gmail.com',
          password: 'admin123',
        }}
      >
        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email không được để trống' },
            { type: 'email', message: 'Email sai định dạng' },
          ]}
        >
          <Input
            size="large"
            prefix={<MdOutlineAlternateEmail />}
            placeholder="Nhập email"
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: 'Mật khẩu không được để trống' },
            { min: 6, message: 'Mật khẩu phải lớn hơn 6 kí tự' },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<GoShieldCheck />}
            placeholder="Nhập mật khẩu"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Đăng nhập
        </Button>
      </Form>

      <AuthNavigation
        primaryLabel="Đăng kí."
        primaryDescription="Không có tài khoản?"
        primaryHref="/register"
      />
    </>
  );
}

export default Login;
