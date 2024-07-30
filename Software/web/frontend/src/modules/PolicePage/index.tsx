'use client';
import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Space, message, Card } from 'antd';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { usingPoliceAPI, usingAuthenticationAPI } from '@/apis';

const PoliceDashboard = () => {
    const [policeInfo, setPoliceInfo] = useState<any>(null);
    const [currentMission, setCurrentMission] = useState<any>(null);
    const [missionCompleted, setMissionCompleted] = useState(false);
    const [policeId, setPoliceId] = useState<string>('');
    const [missionId, setMissionId] = useState<string>('');

    const mapContainerStyle = {
        width: '100%',
        height: '100%',
    };

    const center = {
        lat: 15.974684369487031,
        lng: 108.25214311410093,
    };

    useEffect(() => {
        const fetchPoliceId = async () => {
            try {
                const response = await usingAuthenticationAPI.cookie();
                const userData = response.data;
                setPoliceId(userData.user_id);
                message.info(`Police ID: ${userData.user_id}`);
            } catch (error) {
                console.error('Error fetching police ID:', error);
            }
        };

        fetchPoliceId();
    }, []);

    useEffect(() => {
        const fetchAssignedMission = async () => {
            try {
                if (policeId) {
                    const response = await usingPoliceAPI.getAssignedMissions(policeId);
                    const assignedMissions = response.data;
                    if (assignedMissions.length > 0) {
                        setMissionId(assignedMissions[0].id);
                    }
                }
            } catch (error) {
                console.error('Error fetching assigned mission:', error);
            }
        };

        fetchAssignedMission();
    }, [policeId]);

    useEffect(() => {
        const fetchPoliceInfo = async () => {
            try {
                if (policeId) {
                    const response = await usingPoliceAPI.get(policeId);
                    setPoliceInfo(response.data);
                }
            } catch (error) {
                console.error('Error fetching police info:', error);
            }
        };

        fetchPoliceInfo();
    }, [policeId]);

    useEffect(() => {
        const fetchMissionDetails = async () => {
            try {
                if (missionId) {
                    const response = await usingPoliceAPI.getMission(missionId);
                    setCurrentMission(response.data);
                }
            } catch (error) {
                console.error('Error fetching mission details:', error);
            }
        };

        fetchMissionDetails();
    }, [missionId]);

    const handleCompleteMission = async () => {
        try {
            await usingPoliceAPI.updateMission(missionId, { state: 'Completed' });
            setMissionCompleted(true);
            message.success('Mission completed successfully.');
        } catch (error) {
            console.error('Error completing mission:', error);
            message.error('Error completing mission.');
        }
    };

    return (
        <div className="p-5">
            {policeInfo && (
                <Card className="mb-6" title="Police Information">
                    <p><strong>ID:</strong> {policeInfo.id}</p>
                    <p><strong>Name:</strong> {policeInfo.full_name}</p>
                </Card>
            )}

            {currentMission ? (
                <Row gutter={[16, 16]}>
                    <Col span={18} className="w-[1200px] h-full flex justify-center">
                        <div className="border border-gray-800 rounded-lg shadow-lg w-full h-[500px] flex justify-center items-center overflow-hidden">
                            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_KEY_GOOGLE_MAP}>
                                <GoogleMap mapContainerStyle={mapContainerStyle} zoom={18} center={currentMission.location} options={{ mapTypeId: 'roadmap' }}>
                                    <Marker position={currentMission.location} />
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </Col>
                    <Col span={6} className='flex justify-center items-center'>
                        <Space direction="vertical" className="w-full max-w-xs">
                            <Button
                                className="text-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 rounded-lg"
                                type="primary"
                                block
                                onClick={handleCompleteMission}
                            >
                                Complete Mission
                            </Button>
                            {missionCompleted && (
                                <div className="text-center text-lg text-green-600">Mission Completed</div>
                            )}
                        </Space>
                    </Col>
                </Row>
            ) : (
                <div className="text-center text-lg text-gray-500">No current missions.</div>
            )}
        </div>
    );
};

export default PoliceDashboard;
