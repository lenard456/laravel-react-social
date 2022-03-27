import { atom } from "recoil";

const feedState = atom({
    key: 'feed',
    default: {
        currentPage: 0,
        lastPage: null,
        postIds: []
    }
})

export default feedState