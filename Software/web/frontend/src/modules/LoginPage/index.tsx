'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { usingAuthenticationAPI } from '@/apis/authentication';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await usingAuthenticationAPI.login(values);
      const userData = response.data;

      if (userData) {
        message.success('Login successful!');
        
        switch (userData.role) {
          case 'admin':
            router.push('/admin');
            break;
          case 'security':
            router.push('/security-staff');
            break;
          default:
            router.push('/register');
            break;
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      message.error('Login failed. Please check your username and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleForgot = () => {
    router.push('/forgot-password');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full w-full space-y-8">
        <h1 className="text-center text-4xl text-white font-bold">Login</h1>
        <Form
          name="normal_login"
          className="space-y-4"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Button type="link" onClick={handleForgot}>Forgot password</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full  bg-blue-400" loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-between">
          <Button type="link" className='items-center' onClick={handleRegister}>Register Now</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
