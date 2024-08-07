import { AUTHEN_API } from './index';

export const usingAuthenticationAPI = {
    registerAdmin: (values: { [key: string]: any }) => {
        return AUTHEN_API.post('/register-admin', values, { withCredentials: true });
    },
    login: (values: { [key: string]: any }) => {
        return AUTHEN_API.post('/login', values, { withCredentials: true });
    },
    cookie: () => {
        return AUTHEN_API.get('/me', { withCredentials: true });
    },
    logout: () => {
        return AUTHEN_API.post('/logout', { withCredentials: true });
    }
};
