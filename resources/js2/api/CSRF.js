import Cookies from 'js-cookie'
import MyAxios from './MyAxios'

export const getCookie = async() => {
    const token = Cookies.get('XSRF-TOKEN')
    return token || await MyAxios.get('/csrf-cookie')
}