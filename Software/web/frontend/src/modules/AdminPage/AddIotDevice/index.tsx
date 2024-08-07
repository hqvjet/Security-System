'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useRouter } from 'next/navigation';
import { usingIotDeviceAPI } from '@/apis';

const AddIoTDeviceForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: { [key: string]: any }) => {
    try {
      setLoading(true);
      const response = await usingIotDeviceAPI.create(values);
      message.success('IoT Device added successfully!');
      console.log('IoT Device added successfully:', response.data);
      setLoading(false);
      router.push('/admin');
    } catch (error) {
      console.error('Error adding IoT Device:', error);
      message.error('Failed to add IoT Device');
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        form={form}
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
          rules={[{ required: true, message: 'Please select power status!' }]}
        >
          <Select>
            <Select.Option value={true}>On</Select.Option>
            <Select.Option value={false}>Off</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Geolocation"
          name="geolocation"
          rules={[{ required: true, message: 'Please input geolocation!' }]}
        >
          <Input.TextArea autoSize={{ minRows: 2 }} placeholder="Latitude; Longitude" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add IoT Device
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddIoTDeviceForm;
