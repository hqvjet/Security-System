import { SECURITY_STAFF_API } from '.'

export const usingSecurityStaffAPI = {
    checkViolenceStatus: () => {
        return SECURITY_STAFF_API.get('/violence/is_violence')
    },
    getViolenceVideo: () => {
        return SECURITY_STAFF_API.get('/violence/get_video', {responseType: 'blob'})
    },
    saveViolenceVideo: () => {
        return SECURITY_STAFF_API.get('/violence/save_video')
    },
    denyViolence: () => {
        return SECURITY_STAFF_API.get('/violence/deny')
    }
}
