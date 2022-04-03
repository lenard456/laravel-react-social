//import { map } from 'lodash'
import { useSetRecoilState } from 'recoil'
import conversationsState from '../states/conversationIdsState'
//import useUsersAction from './useUsersAction'
import _ from 'lodash'
import useMessagesAction from './useMessagesAction'

const useConversationsAction = () => {

 //   const { setUsers } = useUsersAction()
    const setConversationsState = useSetRecoilState(conversationsState)
    const { setMessages } = useMessagesAction()

    const setConversations = (conversations) => {
        setConversationsState(_.keyBy(conversations, 'thread_id'))
    }

    const setConversation = ({messages, ...conversation}) => {
        setMessages(conversation.thread_id, messages)
        setConversationsState(old => ({
            ...old,
            [conversation.thread_id]: conversation
        }))
    }

    return { setConversations, setConversation }
}

export default useConversationsAction;