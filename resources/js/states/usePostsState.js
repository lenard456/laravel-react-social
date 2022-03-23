import { atom, useRecoilState } from 'recoil'
import { deepMerge } from '@utils'
import useUsersState from './useUsersState'
import usePostsCommentsState from './usePostsCommentsState'

export const postsState = atom({
    key: 'posts',
    default: {}
})

const usePostsState = function() {
    const [posts, setPosts] = useRecoilState(postsState)
    const { updatePostComments } = usePostsCommentsState()
    const { updateUser } = useUsersState()

    const updatePosts = (newPosts) => {
        let objectNewPosts = newPosts.reduce((acm, {user, comments, ...post}) => {
            if (user) updateUser(user);
            if (comments) updatePostComments(post.id, comments)
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
        posts,
        updatePost,
        updatePosts,
        setPost
    }
}

export const usePostState = function(id) {
    const {  posts, setPost, updatePost } = usePostsState()
    const post = posts[id]
    return {
        post,
        setPost,
        updatePost
    }
}

export default usePostsState
