'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { usingAuthenticationAPI } from '@/apis/authentication';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await usingAuthenticationAPI.cookie();
        const userData = response.data;

        if (userData) {
          switch (userData.role) {
            case 'admin':
              router.push('/admin');
              window.location.reload();
              break;
            case 'security':
              router.push('/security-staff');
              window.location.reload();
              break;
            case 'police':
              router.push('/police');
              window.location.reload();
              break;
            default:
              router.push('/register');
              window.location.reload();
              break;
          }
        }
      } catch (error) {
        console.error('Error checking login:', error);
      }
    };

    checkLoggedIn();
  }, [router]);

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
            window.location.reload();
            break;
          case 'security':
            router.push('/security-staff');
            window.location.reload();
            break;
          case 'police':
              router.push('/police');
              window.location.reload();
              break;
          default:
            router.push('/register');
            window.location.reload();
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
    <div className="h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-200 p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Login</h1>
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
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Username"
              className="border rounded-lg"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              className="border rounded-lg"
            />
          </Form.Item>
          <Form.Item className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-600">Remember me</Checkbox>
            </Form.Item>
            <Button type="link" onClick={handleForgot} className="text-blue-500">Forgot password</Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <Button
            type="link"
            onClick={handleRegister}
            className="text-blue-500 hover:text-blue-600"
          >
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
