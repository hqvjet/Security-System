'use client'
import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { usingAdminAPI } from '@/apis/admin'
import { useRouter } from 'next/navigation';

const AddStaffForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const onFinish = async (values: { [key: string]: any; }) => {
    try {
      setLoading(true);
      const response = await usingAdminAPI.addStaff(values);
      message.success('Staff added successfully!');
      console.log('Staff added successfully:', response.data);
      setLoading(false);
      router.push('/admin');
    } catch (error) {
      console.error('Error adding staff:', error);
      message.error('Failed to add staff');
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  const { Option } = Select;

  const handleRoleChange = (value: string) => {
    setShowAdditionalFields(value === 'police');
  };

  return (
    <div>
      <Form
        name="addStaff"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ role: 'security' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: 'Please input ID!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input username!' }]}
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

        {/* <Form.Item
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
        </Form.Item> */}

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true, message: 'Please input full name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: 'Please input age!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input phone number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="CCCD"
          name="cccd"
          rules={[{ required: true, message: 'Please input CCCD!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Work At"
          name="work_at"
          rules={[{ required: true, message: 'Please input Work At!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Select onChange={handleRoleChange}>
          <Option value="security">Security</Option>
            <Option value="police">Police</Option>
          </Select>
        </Form.Item>

        {showAdditionalFields && (
          <>
            <Form.Item
              label="Certification"
              name="certification"
              rules={[{ required: true, message: 'Please input certification!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Work History"
              name="work_history"
              rules={[{ required: true, message: 'Please input work history!' }]}
            >
              <Input />
            </Form.Item>
          </>
        )}

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Staff
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddStaffForm;
