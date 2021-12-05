import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": `3dd28bfa-de70-4d8b-877f-f4a0a3dde96b`
    },
})

export const usersAPI = {
    getUsersRequest(currentPage, pageSize) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    followUsers(id) {
        return instance
            .post(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
    unfollowUsers(id) {
        return instance
            .delete(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },

}

export const authApi = {
    me() {
        return instance
            .get(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login(email, password, rememberMe, captcha) {
        return instance
            .post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance
            .delete(`auth/login`)
    },
}

export const profileApi = {
    setProfile(userId) {
        return instance
            .get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance
            .get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance
            .put(`profile/status`, { status: status })
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance
            .put(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
    },
    saveProfile(profile) {
        return instance
            .put(`profile`, profile);
    },
}

export const securityApi = {
    getCaptcha() {
        return instance
            .get(`security/get-captcha-url`)
    },
}

