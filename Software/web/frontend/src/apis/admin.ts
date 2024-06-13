import axios from 'axios';

export const ADMIN_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/admin',
    timeout: 10000
});

export const usingAdminAPI = {
    addStaff: (staffData: { [key: string]: any }) => {
        return ADMIN_API.post('/add-staff', staffData);
    }
};
