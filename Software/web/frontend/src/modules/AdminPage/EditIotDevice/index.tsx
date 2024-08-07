'use client';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { usingIotDeviceAPI } from '@/apis';

const EditIoTDeviceForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchDeviceData = async () => {
      const id = searchParams.get('id');
      const type = searchParams.get('type');
      
      if (id && type === 'iot') {
        try {
          const response = await usingIotDeviceAPI.get(id);
          form.setFieldsValue(response.data);
        } catch (error) {
          console.error('Error fetching IoT device data:', error);
          message.error('Failed to fetch IoT device data');
        }
      }
    };

    fetchDeviceData();
  }, [searchParams, form]);

  const onFinish = async (values: { [key: string]: any }) => {
    const deviceId = searchParams.get('id');

    if (!deviceId) {
      message.error('Device ID is required');
      return;
    }

    try {
      setLoading(true);
      const response = await usingIotDeviceAPI.update(deviceId, values);
      message.success('IoT Device updated successfully!');
      console.log('IoT Device updated successfully:', response.data);
      setLoading(false);
      router.push('/admin');
    } catch (error) {
      console.error('Error updating IoT Device:', error);
      message.error('Failed to update IoT Device');
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
        name="editIotDevice"
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
          <Input disabled={true} />
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
            Save IoT Device
          </Button>
        </Form.Item>
      </Form> 
    </div>
  );
};

export default EditIoTDeviceForm;
