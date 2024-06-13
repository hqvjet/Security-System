import axios from 'axios';

export const POLICE_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/police',
    timeout: 10000
});
