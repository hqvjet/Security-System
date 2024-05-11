'use client'
import React, { useState } from 'react';
import { Button, Row, Col, Space } from 'antd';
import { VideoCameraOutlined, EnvironmentOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const SecurityStaffDashboard = () => {
    const [showMap, setShowMap] = useState(false);

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
            <Row gutter={[16, 16]}>
                <Col span={18}>
                    {/* Khung video chính hoặc map */}
                    <div style={{ border: '1px solid #ccc', width : '800px', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {showMap ? (
                            <div>Hiển thị map ở đây</div>
                        ) : (
                            <VideoCameraOutlined style={{ fontSize: '64px', color: '#ccc' }} />
                        )}
                    </div>
                </Col>
                <Col span={6}>
                    {/* Hàng nút bên phải của khung video */}
                    <div style={{ padding: '50px' , paddingTop: '100px'}}>
                        <Space direction="vertical" style={{ width: '100%', paddingTop: '100px' }}>
                            <Button type="primary" block onClick={handleSaveVideo}>Lưu video</Button>
                            <Button type="primary" block onClick={toggleMap}>{showMap ? 'Show Video' : 'Show Map'}</Button>
                            <Button type="primary" block onClick={handleToggleBell}>Tắt chuông</Button>
                        </Space>
                    </div>
                </Col>
            </Row>
            <Row justify="start"  style={{ marginTop: '20px', alignItems: 'center', justifyContent: 'center'}}>
                <Col span={10}>
                    <Space>
                        <Button type="primary" icon={<CheckCircleOutlined />} onClick={handleAccept}>Accept</Button>
                        <Button type="default" icon={<CloseCircleOutlined />} onClick={handleCancel}>Cancel</Button>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default SecurityStaffDashboard;
