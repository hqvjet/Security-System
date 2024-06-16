'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { AlignCenterOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { usingAuthenticationAPI } from '@/apis/authentication';

interface RegisterFormValues {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  full_name: string;
  age: number;
  address: string;
  phone: string;
  cccd: string;
  agree: boolean;
}

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const response = await usingAuthenticationAPI.registerAdmin(values);
      message.success('Registered successfully!');
      console.log('User registered successfully:', response.data);
      router.push('/login');
    } catch (error) {
      console.error('Error registering:', error);
      message.error('Registration failed. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div>
      <Form
        name="register"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: 'Please input your age!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="CCCD"
          name="cccd"
          rules={[{ required: true, message: 'Please input your CCCD!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="agree"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
          rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Please agree to terms and conditions!') }]}
        >
          <Checkbox>I agree to the terms and conditions</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
          <Button style = {{background:"#1944BA"}} type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center', marginTop: '20px', marginLeft:'100px' }}>
          Already have an account? <Button type="link" onClick={handleLogin}>Login</Button>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
