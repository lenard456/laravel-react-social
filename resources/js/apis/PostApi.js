import Http, { requestCookie } from '@utils/Http'

export const fetchFeed = async(page = 1) => {
    await requestCookie()
    return Http.get('/posts', {
        params: { page }
    })
}

export const fetchPost = async(postId) => {
    await requestCookie()
    return Http.get(`/posts/${postId}`);
}

export const createPost = async(content) => {
    await requestCookie()
    return Http.post('/posts', {content})
}

export const likePost = async(postId) => {
    await requestCookie()
    return Http.post(`/posts/${postId}/like`);
}

export const unLikePost = async(postId) => {
    await requestCookie()
    return Http.post(`/posts/${postId}/unlike`);
}

export const comment = async(postId, content) => {
    await requestCookie()
    return Http.post(`/posts/${postId}/comment`, {content})
}

export default {
    fetchFeed,
    createPost
}