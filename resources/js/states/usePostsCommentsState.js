import { atom, useRecoilState } from "recoil";
import useCommentsState from "./useCommentsState";

const postsCommentsState = atom({
    key: 'postComments',
    default: {}
})

const usePostsCommentsState = function() {
    const { updateComments } = useCommentsState()
    const [postsComments, setPostsComments] = useRecoilState(postsCommentsState)

    const updatePostComments = (id, comments) => {
        updateComments(comments)
        setPostsComments(oldPostComments => {
            const commentIds = comments.map(comment => comment.id)
            return {...oldPostComments, [id]:commentIds}
        })
    }

    return {
        updatePostComments,
        postsComments
    }
}

export const usePostCommentsState = function(postId) {
    const { postsComments } = usePostsCommentsState()
    const { comments } = useCommentsState()

    const commentIds = postsComments[postId] || []
    const postComments = commentIds.map((id) => comments[id])

    return {
        postComments
    }
}

export default usePostsCommentsState