'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-12 bg-slate-400 shadow-lg rounded-lg">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-4xl font-bold text-center text-blue-700">Register</h1>
        </div>
        <Form
          name="register"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-4"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Password" />
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
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="full_name"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please input your age!' }]}
          >
            <Input type="number" placeholder="Age" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input placeholder="Address" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item
            label="CCCD"
            name="cccd"
            rules={[{ required: true, message: 'Please input your CCCD!' }]}
          >
            <Input placeholder="CCCD" />
          </Form.Item>

          <Form.Item
            name="agree"
            valuePropName="checked"
            wrapperCol={{ span: 24 }}
            rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Please agree to terms and conditions!') }]}
          >
            <Checkbox>I agree to the terms and conditions</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition duration-300"
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            Already have an account?{' '}
            <Button type="link" className="text-blue-500 hover:text-blue-600" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
