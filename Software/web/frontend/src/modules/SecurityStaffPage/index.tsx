'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Button, Row, Col, Space, message, Select} from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { usingSecurityStaffAPI, usingPoliceAPI, usingIotDeviceAPI} from '@/apis';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const SecurityStaffDashboard = () => {
    const [detected, setDetected] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [videoURL, setVideoURL] = useState(null);
    const [audio] = useState(new Audio('sound/alert.mp3'));
    const videoRef = useRef(null)
    const [policeList, setPoliceList] = useState<any[]>([]);
    const [iotDevices, setIotDevices] = useState<IoTDevice[]>([]);

    interface IoTDevice {
        id: string;
        geolocation: string;
    }

    const mapContainerStyle = {
        width: '100%',
        height: '100%',
    };
    const { Option } = Select;
    const center = {
        lat: 15.974684369487031,
        lng: 108.25214311410093,
    };    
    useEffect(() => {
        let isMounted = true;

        const fetchViolenceStatus = () => {
            if (isMounted) {
                if (!detected) {
                    usingSecurityStaffAPI.checkViolenceStatus()
                        .then((res: any) => {
                            console.log(res);
                            if (res.data.message == 1) {
                                playAlert();
                                setDetected(true);
                            } else {
                                setDetected(false);
                            }
                        })
                        .catch((e) => {
                            console.log(e);
                            message.error('Ohhh! There are some errors');
                        });
                }

                setTimeout(fetchViolenceStatus, 3000);
            }
        };

        fetchViolenceStatus();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (detected) {
            usingSecurityStaffAPI.getViolenceVideo()
                .then((res: any) => {
                    const video_blob = new Blob([res.data], { type: 'video/mp4' });
                    const video_URL = URL.createObjectURL(video_blob);
                    console.log(video_URL);
                    setVideoURL(video_URL);
                })
                .catch((e) => {
                    console.log(e);
                    message.error('Error While Fetching Video!');
                });
        }
    }, [detected]);

    useEffect(() => {
        const fetchPoliceList = async () => {
            try {
                const response = await usingPoliceAPI.getList();
                setPoliceList(response.data);
            } catch (error) {
                console.error("Error fetching police list:", error);
            }
        };

        fetchPoliceList();
    }, []);

    useEffect(() => {
        const fetchIotDevices = async () => {
            try {
                const response = await usingIotDeviceAPI.getList();
                // const filteredDevices = response.data.filter((device: IoTDevice) => device.id === 'iot_0001');
                // setIotDevices(filteredDevices);
                console.log(response.data); 
                setIotDevices(response.data);
            } catch (error) {
                console.error("Error fetching IoT devices:", error);
            }
        };

        fetchIotDevices();
    }, []);

    const playAlert = () => {
        audio.currentTime = 0;
        audio.play();
    };

    const stopAlert = () => {
        audio.pause();
    };

    const handleAccept = () => {
        setAccepted(true);
        stopAlert();
    };

    const handleCancel = () => {
        usingSecurityStaffAPI.denyViolence()
            .then((res: any) => {
                setDetected(false);
                stopAlert();
            })
            .catch(e => {
                console.log(e);
            });
    };
    
    return (
        <div className="p-5">
            {detected ? (
                accepted ? (
                    <>
                        <Row gutter={[16, 16]}>
                            <Col span={18}>
                                <div className="border border-gray-800 w-[1200px] h-[880px] flex justify-center items-center">
                                    <LoadScript googleMapsApiKey={process.env.NEXT_PULBIC_KEY_GOOGLE_MAP}>
                                        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={18} center={center} options={{mapTypeId: 'hybrid'}}>
                                            {iotDevices.map(device => {
                                                const [lat, lng] = device.geolocation.split(';').map(Number);
                                                // message.info(`Latitude: ${lat}, Longitude: ${lng}`);
                                                return (
                                                    <Marker
                                                        key={device.id}
                                                        position={{ lat, lng }}
                                                    />
                                                );
                                            })}
                                        </GoogleMap>
                                    </LoadScript>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="p-24 pt-24">
                                    <Space direction="vertical" className="w-full max-w-xs pt-24">
                                        <Button className="mb-5 text-2xl bg-green-400" type="primary" block>Lưu video</Button>
                                        <Button className="mb-5 text-2xl" type="primary" block>Tắt chuông</Button>
                                        <Select mode="multiple" className="w-[200px] text-xl" placeholder="Chọn police">
                                            {policeList.map(police => (
                                                <Option key={police.id} value={police.id}>{police.name}</Option>
                                            ))}
                                        </Select>
                                        <Button className="mb-5 text-2xl" type="primary" block>Giao Nhiệm Vụ</Button>
                                    </Space>
                                </div>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <div>
                        <div className="border border-gray-300 w-[1200px] h-[800px] flex justify-center items-center">
                            {videoURL == null ? (
                                <p>LOADING VIDEO</p>
                            ) : (
                                <video controls className="w-full h-full">
                                    <source src={videoURL} />
                                </video>
                            )}
                        </div>

                        <div className="mt-6 flex items-center justify-center">
                            <Space>
                                <Button className="text-2xl" type="primary" icon={<CheckCircleOutlined />} onClick={handleAccept}>Accept</Button>
                                <Button className="text-2xl" type="default" icon={<CloseCircleOutlined />} onClick={handleCancel}>Cancel</Button>
                            </Space>
                        </div>
                    </div>
                )
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center text-9xl text-green-600 drop-shadow-lg">No Violence Detected</div>
                </div>
            )}
        </div>
    );
};

export default SecurityStaffDashboard;
