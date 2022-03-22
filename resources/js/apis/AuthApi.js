import Http, { requestCookie } from '@utils/Http'
export default {
    login: async function(formData) {
        await requestCookie()
        return await Http.post('/login', formData)
    },

    logout: async function() {
        await requestCookie()
        return await Http.post('/logout')
    },

    register: async function(formData) {
        await requestCookie()
        return await Http.post('/register', formData)
    },

    fetchCurrentUser: async function() {
        await requestCookie()
        return await Http.get('/user')
    }
}