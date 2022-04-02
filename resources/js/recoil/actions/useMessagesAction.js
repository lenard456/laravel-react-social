import { useSetRecoilState } from 'recoil'
import messagesState from '../states/messagesState'

const useMessagesAction = () => {

    const setMessagesState = useSetRecoilState(messagesState)

    const setMessages = (userId, messages) => {
        setMessages(old => ({
            ...old,
            [userId]: messages
        }))
    }

    return {
        setMessages
    }
}

export default useMessagesAction