'use client'
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onFinish = async (values: { [key: string]: any; }) => {
    try {
      setLoading(true);
      setMessage('User registered successfully: ' + JSON.stringify(values));
      const response = await axios.post('http://localhost:8000/register-admin', values);
      console.log('User registered successfully:', response.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error registering user:', error);
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {message && <p className='text-gray-50'>{message}</p>}
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
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
          <Input.Password />
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
          rules={[{ required: true, message: 'Please agree to terms and conditions!' }]}
        >
          <Checkbox>I agree to the terms and conditions</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
