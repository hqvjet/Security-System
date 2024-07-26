import { IOT_API } from './index';

export const usingIotDeviceAPI = {
    getList: () => {
        return IOT_API.get('/get_list');
    },
    get: (deviceId: string) => {
        return IOT_API.get(`/get/${deviceId}`);
    },
    delete: (deviceId: string) => {
        return IOT_API.delete(`/delete/${deviceId}`);
    },
    update: (deviceId: string, deviceData: { [key: string]: any }) => {
        return IOT_API.put(`/update/${deviceId}`, deviceData);
    }
};
