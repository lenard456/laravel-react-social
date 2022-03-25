import { atom } from "recoil";

const postsState = atom({
    key: 'v2.posts',
    default: {}
})

export default postsState