'use client'
import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Space, message, Card, Input } from 'antd';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { usingPoliceAPI, usingAuthenticationAPI } from '@/apis';

const PoliceDashboard = () => {
    const [policeInfo, setPoliceInfo] = useState<any>(null);
    const [currentMission, setCurrentMission] = useState<any>(null);
    const [missionCompleted, setMissionCompleted] = useState(false);
    const [policeId, setPoliceId] = useState<string>('');
    const [missionId, setMissionId] = useState<string>('');
    const [geolocations, setGeolocations] = useState<{ lat: number; lng: number }[]>([]);
    const [newGeolocation, setNewGeolocation] = useState<string>('');
    const [mapLoaded, setMapLoaded] = useState(false);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const mapContainerStyle = {
        width: '100%',
        height: '100%',
    };

    const initialCenter = {
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
                    const response = await usingPoliceAPI.getMission(policeId);
                    if (response.data) {
                        setCurrentMission(response.data);
                        setMissionId(response.data.id);
                        message.info(`Mission ID: ${response.data.id}`);
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
        const fetchAllGeolocations = async () => {
            try {
                const response = await usingPoliceAPI.getAllGeolocations();
                const locations = response.data.map((loc: string) => {
                    const [lat, lng] = loc.split(',').map(Number);
                    return { lat, lng };
                });
                setGeolocations(locations);
            } catch (error) {
                console.error('Error fetching all geolocations:', error);
            }
        };

        fetchAllGeolocations();
    }, []);

    useEffect(() => {
        const updateGeolocationPeriodically = () => {
            const intervalId = setInterval(async () => {
                try {
                    if (policeId) {
                        const response = await usingPoliceAPI.get(policeId);
                        const { geolocation } = response.data;
                        setNewGeolocation(geolocation);
                        if (map) {
                            map.setCenter({
                                lat: parseFloat(geolocation.split(',')[0]),
                                lng: parseFloat(geolocation.split(',')[1]),
                            });
                        }
                    }
                } catch (error) {
                    console.error('Error updating geolocation:', error);
                }
            }, 3000);

            return () => clearInterval(intervalId);
        };

        updateGeolocationPeriodically();
    }, [policeId, map]);

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

    const handleUpdateGeolocation = async () => {
        try {
            await usingPoliceAPI.updateGeolocation(policeId, newGeolocation);
            message.info(`New geolocation: ${newGeolocation}`);
            message.success('Geolocation updated successfully.');
        } catch (error) {
            console.error('Error updating geolocation:', error);
            message.error('Error updating geolocation.');
        }
    };

    const onMapLoad = (map: google.maps.Map) => {
        setMap(map);
        setMapLoaded(true);
    };

    return (
        <div className="p-5">
            {policeInfo && (
                <Card className="mb-6" title="Police Information">
                    <p><strong>ID:</strong> {policeInfo.id}</p>
                    <p><strong>Name:</strong> {policeInfo.full_name}</p>
                    <Input
                        placeholder="Update geolocation (lat,lng)"
                        value={newGeolocation}
                        onChange={(e) => setNewGeolocation(e.target.value)}
                        className="mb-4"
                    />
                    <Button
                        type="primary"
                        onClick={handleUpdateGeolocation}
                    >
                        Update Geolocation
                    </Button>
                </Card>
            )}

            {currentMission ? (
                <Row gutter={[16, 16]}>
                    <Col span={18} className="w-[1200px] h-full flex justify-center">
                        <div className="border border-gray-800 rounded-lg shadow-lg w-full h-[500px] flex justify-center items-center overflow-hidden">
                            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_KEY_GOOGLE_MAP}>
                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    zoom={14}
                                    center={currentMission.location || initialCenter}
                                    options={{ mapTypeId: 'roadmap' }}
                                    onLoad={onMapLoad}
                                >
                                    {mapLoaded && (
                                        <>
                                            <Marker
                                                position={currentMission.location}
                                                icon={{
                                                    url: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
                                                }}
                                            />
                                            {geolocations.map((loc, index) => (
                                                <Marker
                                                    key={index}
                                                    position={loc}
                                                    icon={{
                                                        url: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
                                                        scaledSize: new window.google.maps.Size(32, 32),
                                                    }}
                                                />
                                            ))}
                                        </>
                                    )}
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
