import { atom, useRecoilState } from "recoil";
import useCommentsState from "./useCommentsState";

const postsCommentsState = atom({
    key: 'postComments',
    default: {}
})

const reducer = (postsComments, type, payload) => {
    switch (type) {
        case 'SET_POST_COMMENTS': {
            const { postId, commentIds } = payload
            return {...postsComments, [postId]:commentIds}
        }
        case 'APPEND_POST_COMMENT':{
            const {postId, commentId} = payload
            let postComments = postsComments[postId] || []
            return {...postsComments, [postId]: [...postComments, commentId]}
        }
    }
    return postsComments
}

const usePostsCommentsState = function() {
    const { dispatch:dispatchCommentState } = useCommentsState()
    const [postsComments, setPostsComments] = useRecoilState(postsCommentsState)

    const extract = (type, payload) => {
        switch (type) {
            case 'SET_POST_COMMENTS': {
                const {postId, comments} = payload
                dispatchCommentState('SET_COMMENTS', comments)
                const commentIds = comments.map(comment => comment.id)
                return {postId, commentIds}
            }
            case 'APPEND_POST_COMMENT': {
                const {postId, comment} = payload
                dispatchCommentState('SET_COMMENT', comment)
                return {postId, commentId: comment.id}
            }
            default:
                return payload
        }
    }

    const dispatch = (type, payload) => {
        const extracted = extract(type, payload)
        setPostsComments(postsComments => reducer(postsComments, type, extracted))
    }

    return {
        dispatch,
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