import Cookies from 'js-cookie'
import axios from 'axios'

const MyAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL
    //baseURL: 'http://localhost:8000/api'
})

MyAxios.defaults.withCredentials = true;
console.log(MyAxios)
export const getCookie = async() => {
    return Cookies.get('XSRF-TOKEN') || await MyAxios.get('/csrf-cookie')
}

export const handlePromise = async(promise) => {

    try {
        await getCookie();
        const { data } = await promise
        return [data, null]
    } catch (error) {
        return [null, error]
    }
}

export default MyAxios