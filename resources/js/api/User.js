import MyAxios, { handlePromise } from './MyAxios'

export const register = (formData) => {
    return handlePromise(MyAxios.post('/register', formData))
} 

export const login = (formData) => {
    return handlePromise(MyAxios.post('/login', formData));
}

export default {
    register,
    login
}