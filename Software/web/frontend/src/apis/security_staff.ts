import axios from 'axios';

export const SECURITY_STAFF_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/security',
    timeout: 10000
});
