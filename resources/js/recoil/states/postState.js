import { atom, useRecoilValue } from 'recoil'

const postState = atom({
    key: 'posts',
    default: {}
})

export const feedState = atom({
    key: 'feeds',
    default: []
})

export const usePostState = function() {
    const posts = useRecoilValue(postState)
    const feedsIds = useRecoilValue(feedState)

    return {
        feeds: feedsIds.map((id) => {
            return posts[id]
        }),

        posts,

        feedsIds
    }
}

export default postState