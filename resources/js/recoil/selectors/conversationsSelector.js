import { selector } from "recoil";
import conversationsState from "../states/conversationIdsState";
//import conversationIdsState from "../states/conversationIdsState";
import usersState from "../states/usersState";

const conversationsSelector = selector({
    key: 'conversations',
    get: ({get}) => {
        //const users = get(usersState)
        const conversations = get(conversationsState)
        return Object.values(conversations)
        //return conversationIds.map(id => users[id])
    }
})

export default conversationsSelector