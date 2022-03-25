import { atom } from "recoil";

const feedState = atom({
    key: 'v2.feed',
    default: {
        currentPage: 0,
        lastPage: null,
        postIds: []
    }
})

export default feedState