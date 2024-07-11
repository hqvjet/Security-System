import { ADMIN_API } from "./index";

// export const ADMIN_API = axios.create({
// baseURL: process.env.NEXT_PUBLIC_API_URL + '/admin',
// timeout: 10000
// });

export const usingAdminAPI = {
    addStaff: (staffData: { [key: string]: any }) => {
        return ADMIN_API.post('/add-staff', staffData);
    },
    getUsername: (adminId: string) => {
        return ADMIN_API.get(`/get-username/${adminId}`);
    },
    get_list: () => {
        return ADMIN_API.get('/get_list');
    }
};
