import {  SECURITY_STAFF_API } from './index'

// export const SECURITY_STAFF_API = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL + '/security',
//     timeout: 10000
// });

export const usingSecurityStaffAPI = {
    getList: () => {
        return SECURITY_STAFF_API.get('/get_list');
    },
    get: (securityId: string) => {
        return SECURITY_STAFF_API.get(`/get/${securityId}`);
    },
    create: (securityStaffData: { [key: string]: any }) => {
        return SECURITY_STAFF_API.post('/create', securityStaffData);
    },
    delete: (securityId: string) => {
        return SECURITY_STAFF_API.delete(`/delete/${securityId}`);
    },
    update: (securityId: string, securityStaffData: { [key: string]: any }) => {
        return SECURITY_STAFF_API.put(`/update/${securityId}`, securityStaffData);
    },
    login: (values: { [key: string]: any }) => {
        return SECURITY_STAFF_API.post('/login', values);
    },
    checkViolenceStatus: () => {
        return SECURITY_STAFF_API.get('/violence/is_violence')
    },
    getViolenceVideo: () => {
        return SECURITY_STAFF_API.get('/violence/get_video', {responseType: 'blob'})
    },
    saveViolenceVideo: () => {
        return SECURITY_STAFF_API.get('/violence/save_video')
    },
    denyViolence: () => {
        return SECURITY_STAFF_API.get('/violence/deny')
    }
}
