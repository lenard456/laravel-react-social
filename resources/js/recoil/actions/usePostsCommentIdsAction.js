import { useSetRecoilState } from "recoil"
import postsCommentIdsState from "../states/postsCommentIdsState"
import useCommentsAction from "./useCommentsAction"

export const SET_POST_COMMENT_IDS = 'SET_POST_COMMENT_IDS'
export const APPEND_POST_COMMENT_IDS = 'APPEND_POST_COMMENT_IDS'

const usePostsCommentIdsAction = () => {

    const setPostsCommentIds = useSetRecoilState(postsCommentIdsState)
    const { setComments, setComment } = useCommentsAction()

    const dispatch = (type, payload) => {
        switch(type) {
            case SET_POST_COMMENT_IDS: {
                const { comments, postId } = payload
                setComments(comments)
                setPostsCommentIds(postsCommentIds => {
                    return {
                        ...postsCommentIds,
                        [postId]: comments.map(comment => comment.id)
                    }
                })
                break;
            }

            case APPEND_POST_COMMENT_IDS: {
                const { postId, comment } = payload
                setComment(comment)
                setPostsCommentIds(postsCommentIds => {
                    const commentIds = postsCommentIds[postId]
                    return {
                        ...postsCommentIds,
                        [postId]: [...commentIds, comment.id]
                    }
                })
                break;
            }
        }
    }

    return dispatch
}

export default usePostsCommentIdsAction