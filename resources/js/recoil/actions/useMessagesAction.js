import { useSetRecoilState } from 'recoil'
import messagesState from '../states/messagesState'

const useMessagesAction = () => {

    const setMessagesState = useSetRecoilState(messagesState)

    const setMessages = (threadId, messages) => {
        setMessagesState(old => ({
            ...old,
            [threadId]: messages
        }))
    }

    const appendMessages = (threadId, message) => {
        setMessagesState(old => {
            const messages = old[threadId] || []
            return {
                ...old,
                [threadId]: [...messages, message]
            }
        })
    }

    return {
        setMessages,
        appendMessages
    }
}

export default useMessagesAction