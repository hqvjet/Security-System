import { AUTHEN_API } from '.'

export const usingAuthenticationAPI = {
    register_admin: (values: {[key: string]: any}) => {
        return AUTHEN_API.post('/register-admin', values)
    }
}
