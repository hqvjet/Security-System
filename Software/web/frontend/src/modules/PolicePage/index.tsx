'use client';
import React, { useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const { Text } = Typography;

const mapContainerStyle = {
  width: '800px',
  height: '600px',
};

const center = {
  lat: 15.974584,
  lng: 108.2497158,
};

const PoliceDashboard = () => {
  const [hasTask, setHasTask] = useState(false);
  const [taskLocation, setTaskLocation] = useState(center);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const handleAcceptTask = () => {
    setHasTask(true);
    setTaskCompleted(false);
  };

  const handleCompleteTask = () => {
    setHasTask(false);
    setTaskCompleted(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      {hasTask && (
        <Row justify="center" style={{ marginBottom: '20px' }}>
          <Col>
            <Text strong>Trạng thái: </Text>
            <Text type="danger">Có nhiệm vụ</Text>
          </Col>
        </Row>
      )}

      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          {!hasTask ? (
            <Button type="primary" onClick={handleAcceptTask}>Nhận nhiệm vụ</Button>
          ) : (
            <Button type="primary" onClick={handleCompleteTask}>Hoàn thành nhiệm vụ</Button>
          )}
        </Col>
      </Row>

      {hasTask && (
        <Row justify="center" style={{ border: '1px solid #ccc', padding: '20px' }}>
          <Col>
            <LoadScript googleMapsApiKey="AIzaSyA84gZBiZojqUAE9U-IntmFWssuxAwC_QQ">
              <GoogleMap mapContainerStyle={mapContainerStyle} center={taskLocation} zoom={15}>
                <Marker position={taskLocation} />
              </GoogleMap>
            </LoadScript>
          </Col>
        </Row>
      )}

      {taskCompleted && (
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col>
            <Text type="success" style={{ color: 'black' }}>Chúc mừng bạn đã hoàn thành nhiệm vụ được giao!</Text>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default PoliceDashboard;
