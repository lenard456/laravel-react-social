import Http, { requestCookie } from '@utils/Http'

export const fetchSuggestions = async function() {
    await requestCookie()
    return await Http.get('/users/suggestions');
}

export const followUser = async function (user_id) {
    await requestCookie()
    return await Http.post(`/users/${user_id}/follow`);
}