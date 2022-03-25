import { atom } from "recoil"

const commentsState = atom({
    key: 'v2.comments',
    default: {}
})

export default commentsState