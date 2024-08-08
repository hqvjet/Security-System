import axios from 'axios';
// import {SERVER_API} from '@env';

const SERVER_API = 'http://192.168.17.185:8000/api/v1'
export const POLICE_API = {
    login: (un: string, pw: string) => {
        return axios.post(SERVER_API + '/authentication/login',
            {
                username: un,
                password: pw
            })
    },
    getAllPolicesGeolocation: () => {
        return axios.get(SERVER_API + '/police/geolocation')
    },
    updateGeolocation: (id: any, geolocation: string) => {
        return axios.put(SERVER_API + `/police/geolocation/${id}`, {geolocation: geolocation})
    }
}