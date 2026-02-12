import React from 'react';
import { Form, Input, Button } from 'antd';
import { SlEnvolope } from 'react-icons/sl';

import AuthLogo from './components/AuthLogo';
import AuthTitle from './components/AuthTitle';
import AuthAction from './components/AuthNavigation';

const ForgetPassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values: { email: string }) => {
    console.log('Success:', values);
  };

  return (
    <div className="login">
      <AuthLogo />
      <AuthTitle label="Forget password" />

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Email is invalid' },
          ]}
        >
          <Input
            size="large"
            prefix={<SlEnvolope />}
            placeholder="Enter your email"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Forget password
        </Button>
      </Form>

      <AuthAction
        primaryLabel="Sign up."
        primaryDescription="Don't have an account?"
        primaryHref="/auth/register"
      />
    </div>
  );
};

export default ForgetPassword;
