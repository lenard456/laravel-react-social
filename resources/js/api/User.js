import MyAxios, { handlePromise, getCookie } from './MyAxios'

export const register = (formData) => {
    return handlePromise(MyAxios.post('/register', formData))
} 

export const login = async(formData) => {
    await getCookie()
    return MyAxios.post('/login', formData)
    //return handlePromise(MyAxios.post('/login', formData));
}

export default {
    register,
    login
}