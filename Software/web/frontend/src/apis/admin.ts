import { ADMIN_API } from "./index";

export const usingAdminAPI = {
    addStaff: (staffData: { [key: string]: any }) => {
        return ADMIN_API.post('/add-staff', staffData);
    },
    getUsername: (adminId: string) => {
        return ADMIN_API.get(`/get-username/${adminId}`);
    },
    getMission: (missionId: string) => {
        return ADMIN_API.get(`/get_mission/${missionId}`);
    },
    delete: (missionId: string) => {
        return ADMIN_API.delete(`/delete_mission/${missionId}`);
    },
    getList: () => {
        return ADMIN_API.get('/get_all_missions');
    }
};
