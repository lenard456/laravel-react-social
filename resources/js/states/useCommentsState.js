import { atom, useRecoilState } from "recoil";
import { deepMerge } from "../utils";
import useUsersState from "./useUsersState";

export const commentsState = atom({
    key: 'comments',
    default: {}
})

const commentsReducer = (comments, {updateUser}) => {
    return comments.reduce((acm, {user, ...comment}) => {
        if (user) updateUser(user);
        return {...acm, [comment.id]: comment}
    }, {})
}

const useCommentsState = function() {
    const [comments, setComments] = useRecoilState(commentsState)
    const { updateUser } = useUsersState()

    const updateComments = (newComments) => {
        const reducedComments = commentsReducer(newComments, {
            updateUser
        })

        setComments(oldComments => deepMerge(oldComments, reducedComments))
    }

    return {
        updateComments,
        comments
    }
}

export default useCommentsState