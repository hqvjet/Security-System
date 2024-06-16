'use client'
import React, { useState, useEffect } from 'react';
import { Col, Table, MenuProps, Button, Space } from "antd";
import HorizontalNavigation from "@/components/HorizontalNavigation";
import axios from 'axios';
import MyLineChart from '@/components/Chart';
import { FcAddDatabase, FcDeleteColumn, FcDeleteDatabase, FcDeleteRow, FcEditImage, FcStatistics } from 'react-icons/fc';
import { GiPoliceOfficerHead } from 'react-icons/gi';
import { GoDeviceCameraVideo } from 'react-icons/go';
import { SiSpringsecurity } from 'react-icons/si';
import { useRouter } from 'next/navigation';

import { usingPoliceAPI, usingSecurityStaffAPI, usingIotDeviceAPI } from '@/apis';

const items = [
  { label: 'Police', key: 'police', icon: <GiPoliceOfficerHead /> },
  { label: 'Security Staff', key: 'security', icon: <SiSpringsecurity /> },
  { label: 'IoT Device', key: 'iot', icon: <GoDeviceCameraVideo /> },
  { label: 'Statistic',  key: 'statistic', icon: <FcStatistics />, },
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
        const columns = Object.keys(firstDataItem).map(key => ({
          title: key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          dataIndex: key,
          key: key,
        }));
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
    if (confirm('Are you sure you want to delete this record?')) {
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
    <Col className="w-5/6 h-3/4">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space direction="horizontal" style={{ justifyContent: 'flex-end', marginBottom: '1rem', color: 'green', borderRadius:'10px'}}>
          <Button icon={<FcAddDatabase />} style={{ borderColor:'blueviolet'}} type="primary" onClick={handleAddStaff}>Add New Staff</Button>
          <Button style={{marginLeft:'10px', borderColor:'blueviolet'}} type="primary" onClick={handleAddIotDevice}>Add New Iot Device</Button>
        </Space>
        <HorizontalNavigation onClick={onClick} current={current} items={items} style={{width:'2000px'}}/>
        
        {!statis ? (
          <Table
            // columns={col}
            columns={[...col, {
              title: 'Actions',
              key: 'operation',
              render: (record) => (
                <Space>
                  <Button type="primary" icon={<FcEditImage/>} onClick={() => handleEdit(record)}>Edit</Button>
                  <Button type="primary" icon={<FcDeleteRow/>} danger onClick={() => handleDelete(record)}>Delete</Button>
                </Space>
              ),
            }]}

            dataSource={data}
            className="bg-gray-800 border border-gray-700 divide-y divide-gray-700"
            components={{
              header: {
                cell: (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => <th className="bg-gray-900 text-white">{props.children}</th>,
              },
              body: {
                row: (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => <tr className="bg-gray-800 hover:bg-gray-700 text-white">{props.children}</tr>,
                cell: (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => <td className="p-2">{props.children}</td>,
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
          <MyLineChart/>
        )}
      </Space>
    </Col>
  );
}

export default Admin;

function setColumns(arg0: ({ title: string; dataIndex: string; key: string; } | { title: string; key: string; render: (record: any) => React.JSX.Element; })[]) {
  throw new Error('Function not implemented.');
}
