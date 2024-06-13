import { POLICE_API } from './index';

// export const POLICE_API = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL + '/police',
//     timeout: 10000
// });

export const usingPoliceAPI = {
    getList: () => {
        return POLICE_API.get('/get_list');
    },
    get: (policeId: string) => {
        return POLICE_API.get(`/get/${policeId}`);
    },
    create: (policeData: { [key: string]: any }) => {
        return POLICE_API.post('/create', policeData);
    },
    delete: (policeId: string) => {
        return POLICE_API.delete(`/delete/${policeId}`);
    },
    update: (policeId: string, policeData: { [key: string]: any }) => {
        return POLICE_API.put(`/update/${policeId}`, policeData);
    }
};