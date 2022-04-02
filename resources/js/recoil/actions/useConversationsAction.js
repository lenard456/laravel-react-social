import { map } from 'lodash'
import { useSetRecoilState } from 'recoil'
import conversationIdsState from '../states/conversationIdsState'
import useUsersAction from './useUsersAction'

const useConversationsAction = () => {

    const { setUsers } = useUsersAction()
    const setConversationIdsState = useSetRecoilState(conversationIdsState)

    const setConversations = (conversations) => {
        const ids = map(conversations, 'id')
        setUsers(conversations)
        setConversationIdsState(ids)
    }

    return { setConversations }
}

export default useConversationsAction;