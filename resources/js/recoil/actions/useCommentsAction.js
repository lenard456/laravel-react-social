import { useSetRecoilState } from "recoil"
import commentsState from "../states/commentsState"
import _ from 'lodash'
import useUsersAction, { SET_USERS } from "./useUsersAction"

const useCommentsAction = () => {

    const setCommentsState = useSetRecoilState(commentsState)
    const usersDispatcher = useUsersAction()

    const setComments = (comments) => {
        const users = _.compact(_.map(comments, 'user'))
        usersDispatcher(SET_USERS, {users})
        const commentsObject = _.keyBy(comments.map(({user, ...comment}) => comment), 'id')
        setCommentsState(comments => ({...comments, ...commentsObject}))
    }

    const setComment = (comment) => {
        const { comment } = payload
        setComments([comment])
    }

    return { setComments, setComment }
}

export default useCommentsAction