import MyAxios, { handlePromise, getCookie } from './MyAxios'

export const register = (formData) => {
    return handlePromise(MyAxios.post('/register', formData))
} 

export const login = async(formData) => {
    await getCookie()
    return MyAxios.post('/login', formData)
}

export const getCurrentUser = async() => {
    await getCookie()
    return MyAxios.get('/user')
}

export const logout = async() => {
    await getCookie()
    return await MyAxios.post('/logout');
}