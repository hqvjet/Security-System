'use client'
import React, { useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { EnvironmentOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const PoliceDashboard = () => {
    const [hasTask, setHasTask] = useState(false);
    const [taskLocation, setTaskLocation] = useState('');
    const [taskCompleted, setTaskCompleted] = useState(false);

    const handleAcceptTask = () => {
        // Xử lý khi nhận nhiệm vụ
        setHasTask(true);
        setTaskCompleted(false);
        // Có thể thêm logic ở đây để chọn và gửi thông báo đến cảnh sát cụ thể
        setTaskLocation('Vị trí XYZ');
    };

    const handleCompleteTask = () => {
        // Xử lý khi hoàn thành nhiệm vụ
        setHasTask(false);
        setTaskCompleted(true);
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Thông báo */}
            {hasTask && (
                <Row justify="center" style={{ marginBottom: '20px' }}>
                    <Col>
                        <Text strong>Trạng thái: </Text>
                        <Text type="danger">Có nhiệm vụ</Text>
                    </Col>
                </Row>
            )}

            {/* Nút chuyển đổi trạng thái */}
            <Row justify="center" style={{ marginBottom: '20px' }}>
                <Col>
                    {!hasTask ? (
                        <Button type="primary" onClick={handleAcceptTask}>Nhận nhiệm vụ</Button>
                    ) : (
                        <Button type="primary" onClick={handleCompleteTask}>Hoàn thành nhiệm vụ</Button>
                    )}
                </Col>
            </Row>

            {/* Khung bản đồ */}
            {hasTask && (
                <Row justify="center" style={{ border: '1px solid #ccc', padding: '20px' }}>
                    <Col>
                        <EnvironmentOutlined style={{ fontSize: '24px' }} />
                        <Text strong>Địa điểm nhiệm vụ:</Text>
                        <Text>{taskLocation}</Text>
                    </Col>
                </Row>
            )}

            {/* Thông báo khi hoàn thành nhiệm vụ */}
            {taskCompleted && (
                <Row justify="center" style={{ marginTop: '20px' }}>
                    <Col>
                        <Text type="success" style={{color:'black'}}>Chúc mừng bạn đã hoàn thành nhiệm vụ được giao!</Text>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default PoliceDashboard;
