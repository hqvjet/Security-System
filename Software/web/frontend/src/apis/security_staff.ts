import { SECURITY_STAFF_API } from './index';

export const usingSecurityStaffAPI = {
    getList: () => {
        return SECURITY_STAFF_API.get('/get_list');
    },
    get: (securityId: string) => {
        return SECURITY_STAFF_API.get(`/get/${securityId}`);
    },
    delete: (securityId: string) => {
        return SECURITY_STAFF_API.delete(`/delete/${securityId}`);
    },
    update: (securityId: string, securityStaffData: { [key: string]: any }) => {
        return SECURITY_STAFF_API.put(`/update/${securityId}`, securityStaffData);
    },
    checkViolenceStatus: () => {
        return SECURITY_STAFF_API.get('/violence/is_violence');
    },
    getViolenceVideo: () => {
        return SECURITY_STAFF_API.get('/violence/get_video', { responseType: 'blob' });
    },
    saveViolenceVideo: () => {
        return SECURITY_STAFF_API.get('/violence/save_video');
    },
    denyViolence: () => {
        return SECURITY_STAFF_API.get('/violence/deny');
    },
    assignmission: (missionData: { location: { lat: number, lng: number }, police: string[] }) => {
        return SECURITY_STAFF_API.post('/assign_missions', missionData);
    },
    createMission: (missionData: { [key: string]: any }) => {
        return SECURITY_STAFF_API.post('/create_mission', missionData);
    }
};
