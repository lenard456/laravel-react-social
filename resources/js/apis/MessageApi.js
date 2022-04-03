import Http, { requestCookie } from '@utils/Http'

export const send = async (threadId, content) => {
    await requestCookie()
    return await Http.post(`/threads/${threadId}`, {content})
}

export const fetchMessages = async (threadId) => {
    await requestCookie()
    return await Http.get(`/threads/${threadId}`)
}

export default {
    send
}