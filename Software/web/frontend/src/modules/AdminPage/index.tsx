'use client'
import React, { useState, useEffect } from 'react';
import { Col, Table, MenuProps, Button, Space } from "antd";
import HorizontalNavigation from "@/components/HorizontalNavigation";
import axios from 'axios';
import MyLineChart from '@/components/Chart';
import { FcAddDatabase, FcStatistics } from 'react-icons/fc';
import { GiPoliceOfficerHead } from 'react-icons/gi';
import { GoDeviceCameraVideo } from 'react-icons/go';
import { SiSpringsecurity } from 'react-icons/si';

const items: MenuProps['items'] = [
  {
    label: 'Police',
    key: 'police',
    icon: <GiPoliceOfficerHead />,
  },
  {
    label: 'Security Staff',
    key: 'security',
    icon: <SiSpringsecurity />,
  },
  {
    label: 'IoT Device',
    key: 'iot',
    icon: <GoDeviceCameraVideo />,
  },
  {
    label: 'Statistic',
    key: 'statistic',
    icon: <FcStatistics />,
  },
];

const Admin = () => {
  const [current, setCurrent] = useState('police');
  const [data, setData] = useState([]);
  const [col, setCol] = useState<Array<{ title: string; dataIndex: string; key: string; }>>([]);
  const [statis, setStatis] = useState(false);

  useEffect(() => {
    if (current === 'security') {
      fetchSecurityStaffData();
    } else if (current === 'police') {
      fetchPoliceData();
    } else if (current === 'iot') {
      fetchIoTDeviceData();
    }
  }, [current]);
  
  const fetchData = async (dataType: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/${dataType}`);
      setData(response.data);
      if (response.data.length > 0) {
        const firstDataItem = response.data[0];
        const columns = Object.keys(firstDataItem).map(key => ({
          title: key,
          dataIndex: key,
          key: key,
        }));
        setCol(columns);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const fetchSecurityStaffData = () => fetchData('list_security-staff');
  const fetchPoliceData = () => fetchData('list_police');
  const fetchIoTDeviceData = () => fetchData('iot');
  
  const onClick = (e: { key: React.SetStateAction<string>; }) => {
    setCurrent(e.key);
    setStatis(e.key === 'statistic');
  };

  return (
    <Col className="w-3/4">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space direction="horizontal" style={{ justifyContent: 'flex-end', marginBottom: '1rem', color: 'green', borderRadius:'10px'}}>
          <Button icon={<FcAddDatabase />} style={{ borderColor:'blueviolet'}} type="primary">Add New Staff</Button>
          <Button style={{marginLeft:'10px', borderColor:'blueviolet'}} type="primary">Add New Iot Device</Button>
        </Space>
        <HorizontalNavigation onClick={onClick} current={current} items={items} style={{width:'2000px'}}/>
        
        {!statis ? (
          <Table
            columns={col}
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
