import { selector } from "recoil";
import conversationIdsState from "../states/conversationIdsState";
import usersState from "../states/usersState";

const conversationsSelector = selector({
    key: 'conversations',
    get: ({get}) => {
        const users = get(usersState)
        const conversationIds = get(conversationIdsState)
        return conversationIds.map(id => users[id])
    }
})

export default conversationsSelector