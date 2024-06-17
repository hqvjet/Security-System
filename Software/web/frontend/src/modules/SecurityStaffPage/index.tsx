'use client';
import React, { useState } from 'react';
import { Button, Row, Col, Space } from 'antd';
import { VideoCameraOutlined, EnvironmentOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 15.974584,
  lng: 108.2497158,
};

const SecurityStaffDashboard = () => {
  const [showMap, setShowMap] = useState(false);
  const [detected, setDetected] = useState(true);

  const handleAlert = () => {
    // Xử lý khi có cảnh báo
  };

  const handleSaveVideo = () => {
    // Xử lý lưu video
  };

  const handleToggleBell = () => {
    // Xử lý tắt chuông
  };

  const handleAccept = () => {
    // Xử lý chấp nhận yêu cầu
  };

  const handleCancel = () => {
    // Xử lý hủy bỏ yêu cầu
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div style={{ padding: '20px' }}>
      {detected && (
        <>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <div style={{ border: '1px solid #ccc', width: '1200px', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {showMap ? (
                  <LoadScript googleMapsApiKey="AIzaSyA84gZBiZojqUAE9U-IntmFWssuxAwC_QQ">
                    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
                      <Marker position={center} />
                    </GoogleMap>
                  </LoadScript>
                ) : (
                  <VideoCameraOutlined style={{ fontSize: '64px', color: '#ccc' }} />
                )}
              </div>
            </Col>
            <Col span={5}>
              <div style={{ paddingLeft: '150px', paddingTop: '100px' }}>
                <Space direction="vertical" style={{ width: '120%', paddingTop: '100px' }}>
                  <Button type="primary" block onClick={handleSaveVideo}>Lưu video</Button>
                  <Button type="primary" block onClick={toggleMap}>{showMap ? 'Hiển thị Video' : 'Hiển thị Bản đồ'}</Button>
                  <Button type="primary" block onClick={handleToggleBell}>Tắt chuông</Button>
                </Space>
              </div>
            </Col>
          </Row>
          <Row justify="start" style={{ marginTop: '20px', alignItems: 'center', justifyContent: 'center' }}>
            <Col span={10}>
              <Space>
                <Button type="primary" icon={<CheckCircleOutlined />} onClick={handleAccept}>Chấp nhận</Button>
                <Button type="default" icon={<CloseCircleOutlined />} onClick={handleCancel}>Hủy bỏ</Button>
              </Space>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default SecurityStaffDashboard;
