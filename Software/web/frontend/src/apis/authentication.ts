import { AUTHEN_API } from './index';

export const usingAuthenticationAPI = {
    registerAdmin: (values: { [key: string]: any }) => {
        return AUTHEN_API.post('/register-admin', values);
    },
    login: (values: { [key: string]: any }) => {
        return AUTHEN_API.post('/login', values);
    }
};
