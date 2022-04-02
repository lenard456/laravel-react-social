import Http, { requestCookie } from '@utils/Http'

export const send = async (userId, content) => {
    await requestCookie()
    return await Http.post(`/messages/${userId}`, {content})
}

export const fetchMessages = async (userId) => {
    await requestCookie()
    return await Http.get(`/messages/${userId}`)
}

export default {
    send
}