import { atom, useSetRecoilState } from 'recoil'
import { deepMerge } from '@utils'
import useUsersState from './useUsersState'

export const postsState = atom({
    key: 'posts',
    default: {}
})


const usePostsState = function() {
    const setPosts = useSetRecoilState(postsState)
    const { updateUser } = useUsersState()

    const updatePosts = (newPosts) => {
        let objectNewPosts = newPosts.reduce((acm, post) => {
            if (post.user) updateUser(post.user);
            return {...acm, [post.id]: post}
        }, {})

        setPosts(posts => {
            return deepMerge(posts, objectNewPosts)
        })
    }

    const updatePost = (post) => updatePosts([post])

    const setPost = (post) => {
        setPosts(posts => {
            return {...posts, [post.id] : post}
        })
    }

    return {
        updatePost,
        updatePosts,
        setPost
    }
}

export default usePostsState
