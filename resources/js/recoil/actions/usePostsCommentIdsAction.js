import { useSetRecoilState } from "recoil"
import postsCommentIdsState from "../states/postsCommentIdsState"
import useCommentsAction from "./useCommentsAction"

const usePostsCommentIdsAction = () => {

    const setPostsCommentIds = useSetRecoilState(postsCommentIdsState)
    const { setComments, setComment } = useCommentsAction()

    const setPostCommentIds = (postId, comments) => {
        setComments(comments)
        setPostsCommentIds(postsCommentIds => {
            return {
                ...postsCommentIds,
                [postId]: comments.map(comment => comment.id)
            }
        })
    }

    const appendPostCommentIds = (postId, comment) => {
        setComment(comment)
        setPostsCommentIds(postsCommentIds => {
            const commentIds = postsCommentIds[postId]
            return {
                ...postsCommentIds,
                [postId]: [...commentIds, comment.id]
            }
        })
    }

    return {
        setPostCommentIds,
        appendPostCommentIds
    }
}

export default usePostsCommentIdsAction