import { atom } from "recoil";

const conversationsState = atom({
    key: 'conversations',
    default: {}
})

export default conversationsState