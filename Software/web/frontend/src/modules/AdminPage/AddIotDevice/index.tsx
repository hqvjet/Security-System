'use client'
import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddIotDeviceForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [form] = Form.useForm();

  const onFinish = async (values: { [key: string]: any; }) => {
    try {
      setLoading(true);
      setMessage('IoT Device added successfully: ' + JSON.stringify(values));
      const response = await axios.post('http://localhost:8000/api/v1/iot_device/add_device', values);
      console.log('IoT Device added successfully:', response.data);
      setLoading(false);
      router.push('/admin');
    } catch (error) {
      console.error('Error adding IoT Device:', error);
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  const { Option } = Select;

  return (
    <div>
      {message && <p className='text-gray-50'>{message}</p>}
      <Form
        name="addIotDevice"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
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
          label="Power"
          name="power"
          rules={[{ required: true, message: 'Please input power status!' }]}
        >
          <Select>
            <Option value={true}>On</Option>
            <Option value={false}>Off</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Latitude"
          name="latitude"
          rules={[{ required: true, message: 'Please input latitude!' }]}
        >
          <Input type="number" step="any" />
        </Form.Item>

        <Form.Item
          label="Longitude"
          name="longitude"
          rules={[{ required: true, message: 'Please input longitude!' }]}
        >
          <Input type="number" step="any" />
        </Form.Item>

        <Form.Item
          label="Admin ID"
          name="admin_id"
          rules={[{ required: true, message: 'Please input Admin ID!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit" loading={loading}>
            Add IoT Device
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddIotDeviceForm;
