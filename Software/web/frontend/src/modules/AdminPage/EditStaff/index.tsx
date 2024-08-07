'use client'
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { usingPoliceAPI } from '@/apis/police';
import { usingSecurityStaffAPI } from '@/apis/security_staff';

const { Option } = Select;

const EditStaff = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const type = searchParams.get('type');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [staffData, setStaffData] = useState<any>(null);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  useEffect(() => {
    if (id && type) {
      fetchStaffData(id, type);
    }
  }, [id, type]);

  const fetchStaffData = async (staffId: string, staffType: string) => {
    try {
      let response;
      if (staffType === 'police') {
        response = await usingPoliceAPI.get(staffId);
        setShowAdditionalFields(true);
      } else {
        response = await usingSecurityStaffAPI.get(staffId);
        setShowAdditionalFields(false);
      }
      const dataWithRole = { ...response.data, role: staffType };
      setStaffData(dataWithRole);
      form.setFieldsValue(dataWithRole);
    } catch (error) {
      console.error('Error fetching staff data:', error);
      message.error('Failed to fetch staff data');
    }
  };

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      if (type === 'police') {
        await usingPoliceAPI.update(id as string, values);
      } else {
        await usingSecurityStaffAPI.update(id as string, values);
      }
      message.success('Staff updated successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error saving staff data:', error);
      message.error('Failed to save staff data');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setShowAdditionalFields(value === 'police');
  };

  return (
    <div>
      {staffData && (
        <Form
          form={form}
          name="editStaff"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={staffData}
          onFinish={handleSave}
          autoComplete="off"
        >
          <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: 'Please input ID!' }]}
          >
            <Input disabled />
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
            rules={[{ required: true, message: 'Please input work at!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select onChange={handleRoleChange} value={staffData.role} disabled>
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
              Edit Staff
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditStaff;
