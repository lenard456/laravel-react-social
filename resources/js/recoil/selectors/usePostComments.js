import { useRecoilValue } from "recoil";
import commentsState from "../states/commentsState";
import postsCommentIdsState from "../states/postsCommentIdsState";


const usePostComments = (id) => {
    const comments = useRecoilValue(commentsState)
    const postsCommentIds = useRecoilValue(postsCommentIdsState)
    const postCommentIds = postsCommentIds[id] || []
    return postCommentIds.map(commentId => comments[commentId])
}

export default usePostComments