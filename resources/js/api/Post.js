import MyAxios, { getCookie } from './MyAxios'

export const createPost = async(content) => {
    await getCookie()
    return await MyAxios.post('/post', {content});
}

export const fetchPosts = async() => {
    await getCookie()
    return await MyAxios.get('/post')
}