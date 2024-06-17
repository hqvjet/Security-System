'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Button, Row, Col, Space, message, Modal } from 'antd';
import { VideoCameraOutlined, EnvironmentOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { usingSecurityStaffAPI } from '@/apis/security_staff.ts'

const SecurityStaffDashboard = () => {
    const [showMap, setShowMap] = useState(false);
    const [detected, setDetected] = useState(false);
    const [videoURL, setVideoURL] = useState(null)
    const [audio] = useState(new Audio('sound/alert.mp3'))
    const videoRef = useRef(null)

    // Check for violence status per 3 seconds
    useEffect(() => {
        let isMounted = true;
        
        const fetchViolenceStatus = () => {
            if (isMounted) {
                if (!detected) {
                    usingSecurityStaffAPI.checkViolenceStatus()
                        .then((res: any) => {
                            console.log(res)
                            if (res.data.message == 1) {
                                playAlert()
                                setDetected(true)
                            }
                            else
                                setDetected(false)
                        })
                        .catch((e) => {
                            console.log(e)
                            message.error('Ohhh! There are some errors')
                        })
                }

                setTimeout(fetchViolenceStatus, 3000)
            }
        }

        fetchViolenceStatus()

        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        if (detected) {
            usingSecurityStaffAPI.getViolenceVideo()
                .then((res: any) => {
                    const video_blob = new Blob([res.data], {type: 'video/mp4'})
                    const video_URL = URL.createObjectURL(video_blob)
                    // console.log(video_URL)
                    setVideoURL(video_URL)
                })
                .catch((e) => {
                    console.log(e)
                    message.error('Error While Fetching Video!')
                })
        }
    }, [detected])

    const playAlert = () => {
        audio.currentTime = 0;
        audio.play()
    }
    const stopAlert = () => {
        audio.pause()
    }

    const handleAlert = () => {
        
    }

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
        usingSecurityStaffAPI.denyViolence()
            .then((res: any) => {
                setDetected(false)
                stopAlert()
            })
            .catch(e => {
                console.log(e)
            })
    };

    const toggleMap = () => {
        setShowMap(!showMap);
    };

    return (
        <div style={{ padding: '20px' }}>
            {detected ? (
                <>
                    <Row gutter={[16, 16]}>
                        <Col span={18}>
                            {/* Khung video chính hoặc map */}
                            <div style={{ border: '1px solid #ccc', width : '600px', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {showMap ? (
                                    <div>Hiển thị map ở đây</div>
                                ) : (
                                    videoURL == null ? (
                                        <p>LOADING VIDEO</p> ) :
                                    (
                                        <video controls className='w-full h-full'>
                                            <source src={videoURL}/>
                                        </video>
                                    )
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
                </>
                    ) : (
                <div className='text-5xl text-green-600 drop-shadow-lg'>No Violence Detected</div>
            )}
        </div>
    );
};

export default SecurityStaffDashboard;
