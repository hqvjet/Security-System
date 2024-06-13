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
    }
};