'use client'
import React, { useState, useEffect } from 'react';
import { Col, Table, Button, Space } from "antd";
import HorizontalNavigation from "@/components/HorizontalNavigation";
import MyLineChart from '@/components/Chart';
import { FcAddDatabase, FcDeleteRow, FcEditImage, FcStatistics } from 'react-icons/fc';
import { GiPoliceOfficerHead } from 'react-icons/gi';
import { GoDeviceCameraVideo } from 'react-icons/go';
import { SiSpringsecurity } from 'react-icons/si';
import { useRouter } from 'next/navigation';

import { usingPoliceAPI, usingSecurityStaffAPI, usingIotDeviceAPI } from '@/apis';

const items = [
  { label: 'Police', key: 'police', icon: <GiPoliceOfficerHead /> },
  { label: 'Security Staff', key: 'security', icon: <SiSpringsecurity /> },
  { label: 'IoT Device', key: 'iot', icon: <GoDeviceCameraVideo /> },
  { label: 'Statistic', key: 'statistic', icon: <FcStatistics />, },
];

const Admin = () => {
  const [current, setCurrent] = useState('police');
  const [data, setData] = useState([]);
  const [col, setCol] = useState<Array<{ title: string; dataIndex: string; key: string; }>>([]);
  const [statis, setStatis] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, [current]);

  const fetchData = async () => {
    try {
      let api;
      switch (current) {
        case 'security':
          api = usingSecurityStaffAPI;
          break;
        case 'police':
          api = usingPoliceAPI;
          break;
        case 'iot':
          api = usingIotDeviceAPI;
          break;
        default:
          return;
      }
      const response = await api.getList();
      setData(response.data);
  
      if (response.data.length > 0) {
        const firstDataItem = response.data[0];
        const columns = Object.keys(firstDataItem).map(key => {
          return {
            title: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            dataIndex: key,
            key: key,
            render: (text: any) => {
              if (typeof text === 'boolean') {
                return text ? 'On' : 'Off';
              }
              return text;
            },
          };
        });
        setCol(columns);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };  
  
  const onClick = (e: { key: React.SetStateAction<string>; }) => {
    setCurrent(e.key);
    setStatis(e.key === 'statistic');
  };
  
  const handleAddStaff = () => {
    router.push('/admin/add-staff');
  };
  
  const handleAddIotDevice = () => {
    router.push('/admin/add-iot-device');
  };

  const handleEdit = (record: { [key: string]: any }) => {
    const type = current;
    router.push(`/admin/edit-staff?id=${record.id}&type=${type}`);
  };

  const handleDelete = (record: { [key: string]: any }) => {
    const { id } = record;
    if (window.confirm('Are you sure you want to delete this record?')) {
      let api;
      switch (current) {
        case 'security':
          api = usingSecurityStaffAPI;
          break;
        case 'police':
          api = usingPoliceAPI;
          break;
        case 'iot':
          api = usingIotDeviceAPI;
          break;
        default:
          console.error('Invalid current type:', current);
          return;
      }
  
      api.delete(id)
        .then(() => {
          setData(data.filter((item: { [key: string]: any }) => item.id !== id));
        })
        .catch((error: any) => {
          console.error('Error deleting record:', error);
        });
    }
  };

  return (
    <Col className="w-auto h-5/6 mt-40">
      <Space direction="vertical" className='w-full'>
      <Space direction="horizontal" className="flex justify-start ml-14 mb-4 text-green-500 rounded-lg">
        <Button icon={<FcAddDatabase />} type="primary" className="border-blue-500" onClick={handleAddStaff}>Add New Staff</Button>
        <Button type="primary" className="ml-2 border-blue-500" onClick={handleAddIotDevice}>Add New IoT Device</Button>
      </Space>
        <div className='m-5 w-full'>
          <HorizontalNavigation onClick={onClick} current={current} items={items} />
        </div>
        {!statis ? (
          <Table
            columns={[...col, {
              title: 'Actions',
              key: 'operation',
              render: (record) => (
                <Space className='flex justify-end'>
                  <Button type="primary" icon={<FcEditImage/>} onClick={() => handleEdit(record)}>Edit</Button>
                  <Button type="primary" icon={<FcDeleteRow/>} danger onClick={() => handleDelete(record)}>Delete</Button>
                </Space>
              ),
            }]}

            dataSource={data}
            className="bg-gray-800 border border-gray-700 ml-10, mr-10 w-full divide-gray-700"
            scroll={{ x: 1000, y: 400 }}
            components={{
              header: {
                cell: (props: { children: React.ReactNode }) => <th className="bg-gray-900 text-white">{props.children}</th>,
              },
              body: {
                row: (props: { children: React.ReactNode }) => <tr className="bg-gray-800 hover:bg-gray-700 text-white">{props.children}</tr>,
                cell: (props: { children: React.ReactNode }) => <td className="p-2">{props.children}</td>,
              },
            }}
            pagination={{
              itemRender: (page, type, originalElement) => {
                if (type === 'prev') {
                  return (
                    <div className="cursor-pointer text-blue-500 rounded-full hover:bg-slate-500">&lt;</div>
                  );
                }
                if (type === 'next') {
                  return (
                    <div className="cursor-pointer text-blue-500 rounded-full hover:bg-slate-500">&gt;</div>
                  );
                }
                if (type === 'page') {
                  return (
                    <div className={`cursor-pointer text-white bg-gray-400 rounded-full hover:bg-slate-500 ${page.toString() === current.toString()? 'bg-slate-500 text-white' : 'bg-slate-500'}`}>{page}</div>
                  )
                }
                return originalElement;
              },
            }}
          />
        ) : (
          <div className='flex justify-self-center'>
            <MyLineChart/>
          </div>
        )}
      </Space>
    </Col>
  );
}

export default Admin;
