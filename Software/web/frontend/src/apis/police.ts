import { POLICE_API } from './index';

export const usingPoliceAPI = {
    getList: () => {
        return POLICE_API.get('/get_list');
    },
    get: (policeId: string) => {
        return POLICE_API.get(`/get/${policeId}`);
    },
    delete: (policeId: string) => {
        return POLICE_API.delete(`/delete/${policeId}`);
    },
    update: (policeId: string, policeData: { [key: string]: any }) => {
        return POLICE_API.put(`/update/${policeId}`, policeData);
    },
    getMission: (policeId?: string, missionId?: string) => {
        const params: any = {};
        if (policeId) params.police_id = policeId;
        if (missionId) params.mission_id = missionId;
        return POLICE_API.get('/mission', { params });
    },
    updateMission: (missionId: string, missionData: { [key: string]: any }) => {
        return POLICE_API.put(`/update_mission/${missionId}`, missionData);
    },
    getAllGeolocations: () => {
        return POLICE_API.get('/geolocation');
    },
    getGeolocationByPoliceId: (policeId: string) => {
        return POLICE_API.get(`/geolocation/${policeId}`);
    },
    updateGeolocation: (policeId: string, geolocation: string) => {
        return POLICE_API.put(`/geolocation/${policeId}`, { geolocation });
    }
};
