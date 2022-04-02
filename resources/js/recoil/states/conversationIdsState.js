import { atom } from "recoil";

const conversationIdsState = atom({
    key: 'conversationIds',
    default: []
})

export default conversationIdsState