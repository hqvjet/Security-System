import axios from 'axios';

export const AUTHEN_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/authentication',
    timeout: 10000
});

export const usingAuthenticationAPI = {
    registerAdmin: (values: { [key: string]: any }) => {
        return AUTHEN_API.post('/register-admin', values);
    },
    login: (values: { [key: string]: any }) => {
        return AUTHEN_API.post('/login', values);
    }
};
