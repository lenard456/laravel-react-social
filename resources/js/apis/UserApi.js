import Http, { requestCookie } from '@utils/Http'

export const fetchSuggestions = async function() {
    await requestCookie()
    return await Http.get('/users/suggestions');
}

export const followUser = async function (userId) {
    await requestCookie()
    return await Http.post(`/users/${userId}/follow`);
}

export const unFollowUser = async function(userId) {
    await requestCookie()
    return await Http.post(`/users/${userId}/unfollow`)
}

export const fetchUser = async function(userId) {
    await requestCookie()
    return await Http.get(`/users/${userId}`)
}

export const fetchPosts = async function(userId, page = 1) {
    await requestCookie()
    return await Http.get(`/users/${userId}/posts`, {
        params: {page}
    })
}

export const fetchFollowing = async function(userId, page = 1) {
    await requestCookie()
    return await Http.get(`/users/${userId}/following`, {
        params: {page}
    })
}