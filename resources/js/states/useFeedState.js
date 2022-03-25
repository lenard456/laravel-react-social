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

const feedState = selector({
    key: 'feed',
    get: ({get}) => {
        return {
            currentPage: get(currentPageState),
            lastPage: get(lastPageState),
            postIds: get(postIdsState)
        }
    }
})

const reducer = (feedState, type, payload) => {
    switch(type) {
        case 'SET_FEED': {
            const { currentPage, lastPage, posts } = payload
            return {
                currentPage,
                lastPage,
                postIds: posts.map(post => post.id)
            }
        }

        case 'PREPEND_POST': {
            const post = payload
            return {...feedState, postIds: [post.id, ...feedState.postIds]}
        }

        case 'SET_NEXT_FEED': {
            const { currentPage, lastPage, posts } = payload
            return {
                currentPage,
                lastPage,
                postIds: [...feedState.postIds, ...posts.map(post => post.id)]
            }
        }

        default:
            return feedState
    }
}

export default function () {
    const { dispatch:dispatchPostsState } = usePostsState()
    const feed = useRecoilValue(feedState)
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState)
    const [lastPage, setLastPage] = useRecoilState(lastPageState)
    const [postIds, setPostIds] = useRecoilState(postIdsState)
    const posts = useRecoilValue(feedPosts)

    const extract = (type, payload) => {
        switch (type) {
            case 'SET_NEXT_FEED':
            case 'SET_FEED': {
                const { posts } = payload
                dispatchPostsState('SET_POSTS', posts)
            }

            case 'PREPEND_POST': {
                dispatchPostsState('SET_POSTS', [payload])
            }

        }

        return payload //No transformation only side effects
    }

    const dispatch = (type, payload) => {
        const extracted = extract(type, payload)
        const { currentPage, lastPage, postIds } = reducer(feed, type, extracted)
        setCurrentPage(currentPage)
        setLastPage(lastPage)
        setPostIds(postIds)
    }
    
    return {
        currentPage,
        lastPage,
        postIds,
        posts,
        dispatch
    }
}