'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Button, Row, Col, Space, message, Select } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { usingSecurityStaffAPI, usingPoliceAPI, usingIotDeviceAPI, usingAuthenticationAPI } from '@/apis';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const SecurityStaffDashboard = () => {
    const [detected, setDetected] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [videoURL, setVideoURL] = useState(null);
    const [audio] = useState(new Audio('sound/alert.mp3'));
    const videoRef = useRef(null);
    const [policeList, setPoliceList] = useState<any[]>([]);
    const [iotDevices, setIotDevices] = useState<IoTDevice[]>([]);
    const [selectedPolice, setSelectedPolice] = useState<string[]>([]);
    const [securityStaffId, setSecurityStaffId] = useState<string>('');
    // const [geolocation, setGeolocation] = useState({ lat: 0.0, lng: 0.0 });

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
        const fetchAdminId = async () => {
            try {
                const response = await usingAuthenticationAPI.cookie();
                const userData = response.data;
                setSecurityStaffId(userData.user_id);
                message.info(`ID: ${userData.user_id}`);
            } catch (error) {
                console.error('Error fetching ID:', error);
            }
        };

        fetchAdminId();
    }, []);

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
                                stopAlert();
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
        // if (detected) {
        //     usingSecurityStaffAPI.getViolenceVideo()
        //         .then((res: any) => {
        //             const video_blob = new Blob([res.data], { type: 'video/mp4' });
        //             const video_URL = URL.createObjectURL(video_blob);
        //             console.log(video_URL);
        //             setVideoURL(video_URL);
        //         })
        //         .catch((e) => {
        //             console.log(e);
        //             message.error('Error While Fetching Video!');
        //         });
        // }
        if (detected) {
            usingIotDeviceAPI.getList()
                .then((res: any) => {
                    setIotDevices(res.data)
                    // let geoString = res.data[0].geolocation.split(';');
                    // setGeolocation({ lat: parseFloat(geoString[0]), lng: parseFloat(geoString[1]) })
                    // console.log({ lat: parseFloat(geoString[0]), lng: parseFloat(geoString[1]) })
                })
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

    // useEffect(() => {
    //     const fetchIotDevices = async () => {
    //         try {
    //             const response = await usingIotDeviceAPI.getList();
    //             const filteredDevices = response.data.filter((device: IoTDevice) => device.id === 'iot_0001');
    //             setIotDevices(filteredDevices);
    //             console.log(response.data);
    //         } catch (error) {
    //             console.error("Error fetching IoT devices:", error);
    //         }
    //     };

    //     fetchIotDevices();
    // }, []);

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

    const handleAssignmission = () => {
        if (selectedPolice.length === 0) {
            message.warning('Please select at least one police officer.');
            return;
        }

        if (iotDevices.length === 0) {
            message.warning('No IoT devices available.');
            return;
        }
        const missionData = {
            location: iotDevices[0].geolocation,
            police: selectedPolice,
            security_staff_id: securityStaffId,
            iot_device_id: iotDevices[0].id
        };
        usingSecurityStaffAPI.assignmission(missionData)
            .then(() => {
                message.success('mission assigned successfully.');
                const police_id = policeList
                    .filter(police => selectedPolice.includes(police.id))
                    .map(police => police.id)
                    .join(', ');
                message.info(`Mission assigned`);
            })
            .catch((e: any) => {
                console.error(e);
                message.error('Error assigning mission.');
            });
    };

    return (
        <div className="p-5">
            {detected ? (
                accepted ? (
                    <>
                        <Row gutter={[16, 16]}>
                            <Col span={18} className="flex justify-center">
                                <div className="border border-gray-800 rounded-lg shadow-lg w-[1200px] h-[880px] flex justify-center items-center overflow-hidden">
                                    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_KEY_GOOGLE_MAP as string}>
                                        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={18} center={center}>
                                            {iotDevices.map((device, idx) => {
                                                let geolocation = device.geolocation.split(';'); 
                                                return (
                                                    <Marker
                                                        key={idx}
                                                        position={{lat: Number(geolocation[0]), lng: Number(geolocation[1])}}
                                                    />
                                                );

                                            })}
                                        </GoogleMap>
                                    </LoadScript>
                                </div>
                            </Col>
                            <Col span={6} className='flex justify-center items-center'>
                                <div className="p-12 w-full max-w-xs bg-slate-600 rounded-lg shadow-lg">
                                    <Space direction="vertical" className="w-full max-w-xs h-auto">
                                        <Button className="mb-4 text-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-300 rounded-lg" type="primary" block>Lưu video</Button>
                                        <Button className="mb-4 text-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 rounded-lg" type="primary" block onClick={stopAlert}>Tắt chuông</Button>
                                        <Select
                                            mode="multiple"
                                            className="w-full h-12 mb-4 text-lg rounded-lg border-gray-300"
                                            placeholder="Chọn police"
                                            value={selectedPolice}
                                            onChange={(value) => setSelectedPolice(value)}
                                        >
                                            {policeList.map(police => (
                                                <Option key={police.id} value={police.id}>{police.full_name}</Option>
                                            ))}
                                        </Select>
                                        <Button
                                            className="text-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 rounded-lg"
                                            type="primary"
                                            block
                                            onClick={handleAssignmission}
                                        >
                                            Giao Nhiệm Vụ
                                        </Button>
                                    </Space>
                                </div>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <div>
                        <div className="w-[1200px] h-[800px] flex justify-center items-center overflow-hidden">
                            <h1 className='text-5xl text-green-600 drop-shadow-lg'>Violence Detected, Please Take A Look At violence.mp4</h1>
                        </div>

                        <div className="mt-6 flex items-center justify-center space-x-4">
                            <Button className="text-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-300 rounded-lg" type="primary" icon={<CheckCircleOutlined />} onClick={handleAccept}>Accept</Button>
                            <Button className="text-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 rounded-lg" type="default" icon={<CloseCircleOutlined />} onClick={handleCancel}>Cancel</Button>
                        </div>
                    </div>
                )
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center text-9xl text-green-600 drop-shadow-lg">No Violence Detected</div>
                </div>
            )}
        </div>
    )
}
export default SecurityStaffDashboard;