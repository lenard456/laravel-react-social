import { atom, useRecoilState } from 'recoil'
import { deepMerge } from '@utils'
import useUsersState from './useUsersState'
import usePostsCommentsState from './usePostsCommentsState'

export const postsState = atom({
    key: 'posts',
    default: {}
})

const reducer = (posts, type, payload) => {
    switch(type) {
        case 'SET_POSTS': {
            const newPosts = payload
            return newPosts.reduce((acm, post) => {
                return {...acm, [post.id]: post}
            }, posts)
        }
        case 'SET_POST': {
            return reducer(posts, 'SET_POSTS', [payload])
        }
        default:
            return payload
    }
}

const usePostsState = function() {
    const [posts, setPosts] = useRecoilState(postsState)
    const { dispatch:dispatchPostsCommentState } = usePostsCommentsState()
    const { dispatch:dispatchUserState } = useUsersState()

    const extract = (type, payload) => {
        switch (type) {
            case 'SET_POSTS': {
                const posts = payload
                const extractedPost = []
                posts.forEach(({user, comments, ...post}) => {
                    if (user) dispatchUserState('SET_USER', user)
                    if (comments) dispatchPostsCommentState('SET_POST_COMMENTS', {postId:post.id, comments})
                    extractedPost.push(post)
                })
                return extractedPost
            }
            case 'SET_POST': {
                const { user, comments, ...post } = payload
                if (user) dispatchUserState('SET_USER', user)
                if (comments) dispatchPostsCommentState('SET_POST_COMMENTS', {postId:post.id, comments})
                return post
            }
            default:
                return payload
        }
    }

    const dispatch = (type, payload) => {
        const extracted = extract(type, payload)
        setPosts(posts => reducer(posts, type, extracted))
    }

    return {
        posts,
        dispatch
    }
}

export const usePostState = function(id) {
    const {  posts, dispatch } = usePostsState()
    const post = posts[id]
    return {
        post,
        dispatch
    }
}

export default usePostsState
