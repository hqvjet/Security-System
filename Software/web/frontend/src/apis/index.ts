import axios from 'axios'

export const POLICE_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/police',
    timeout: 10000
})

export const SECURITY_STAFF_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/security_staff',
    timeout: 10000
})

export const ADMIN_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/admin',
    timeout: 10000
})

export const IOT_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/iot_device',
    timeout: 10000
})

export const AUTHEN_API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/authen',
    timeout: 10000
})
