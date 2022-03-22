import { atom, useRecoilState, useRecoilValue, selector } from 'recoil'
import usePostsState, { postsState } from './usePostsState'

const currentPageState = atom({
    key: 'feed.currentPage',
    default: 0
})

const lastPageState = atom({
    key: 'feed.lastPageState',
    default: null
})

const postIdsState = atom({
    key: 'feed.postIds',
    default: []
})

const feedPosts = selector({
    key: 'feed.posts',
    get: ({get}) => {
        let postIds = get(postIdsState)
        let posts = get(postsState)
        return postIds.map(id => posts[id])
    }
})

export default function () {
    const { updatePosts } = usePostsState()
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState)
    const [lastPage, setLastPage] = useRecoilState(lastPageState)
    const [postIds, setPostIds] = useRecoilState(postIdsState)
    const posts = useRecoilValue(feedPosts)

    const updateFeed = ({currentPage, lastPage, posts}) => {
        setCurrentPage(oldValue => currentPage || oldValue)
        setLastPage(oldValue => lastPage || oldValue)
        updatePosts(posts)
        setPostIds(postIds => {
            const newPostIds = posts.map(post => post.id)
            return _.union(postIds, newPostIds)
        })
    }
    
    return {
        currentPage,
        lastPage,
        postIds,
        posts,
        updateFeed,
        setPostIds
    }
}