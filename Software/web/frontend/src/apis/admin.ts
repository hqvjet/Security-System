import { ADMIN_API } from "./index";

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
