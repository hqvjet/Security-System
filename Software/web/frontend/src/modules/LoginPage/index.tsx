'use client'
import React, { useState } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Giải mã token
        const decodedToken: any = jwtDecode(token);
        const role = decodedToken.role;

        // Dựa vào vai trò trong token để điều hướng người dùng
        switch (role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'police':
            navigate('/police');
            break;
          case 'securitystaff':
            navigate('/securitystaff');
            break;
          default:
            navigate('/');
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
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

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </Router>
  );
};

export default App;
