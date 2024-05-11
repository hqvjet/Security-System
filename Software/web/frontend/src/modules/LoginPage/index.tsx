'use client'
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const App: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/login', values);
      const userData = response.data;

      switch (userData.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'police':
          router.push('/police');
          break;
        case 'securitystaff':
          router.push('/securitystaff');
          break;
        default:
          router.push('/register');
          break;
      }
    } catch (error) {
      console.error('Error logging in:', error);
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
    <Router>
      <Form
        name="normal_login"
        className="login-form"
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
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
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
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
            Log in
          </Button>
          Or <Button type="link" onClick={handleRegister}>Register Now</Button>
        </Form.Item>
      </Form>
    </Router>
  );
};

export default App;
