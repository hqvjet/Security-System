import { ADMIN_API } from "./index";

export const usingAdminAPI = {
    addStaff: (staffData: { [key: string]: any }) => {
        return ADMIN_API.post('/add-staff', staffData);
    },
    getUsername: (adminId: string) => {
        return ADMIN_API.get(`/get-username/${adminId}`);
    },
    getList: () => {
        return ADMIN_API.get('/get_list');
    },
    getMission: (missionId: string) => {
        return ADMIN_API.get(`/get_mission/${missionId}`);
    },
    deleteMission: (missionId: string) => {
        return ADMIN_API.delete(`/delete_mission/${missionId}`);
    }
};
