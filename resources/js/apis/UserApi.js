import Http, { requestCookie } from '@utils/Http'

export const fetchSuggestions = async function() {
    await requestCookie()
    return await Http.get('/users/suggestions');
}