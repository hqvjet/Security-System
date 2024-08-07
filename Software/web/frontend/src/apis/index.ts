import axios from 'axios'

export * from './admin';
export * from './authentication';
export * from './police';
export * from './security_staff';
export * from './iot_device';


export const POLICE_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/police',
    withCredentials: true,
    timeout: 10000
})

export const SECURITY_STAFF_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/security_staff',
    withCredentials: true,
    timeout: 10000
})

export const ADMIN_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/admin',
    withCredentials: true,
    timeout: 10000
})

export const IOT_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/iot',
    withCredentials: true,
    timeout: 10000
})

export const AUTHEN_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/authentication',
    withCredentials: true,
    timeout: 10000
})

