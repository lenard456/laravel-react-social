import { useSetRecoilState } from "recoil"
import commentsState from "../states/commentsState"
import _ from 'lodash'
import useUsersAction, { SET_USERS } from "./useUsersAction"

export const SET_COMMENTS = 'SET_COMMENTS'
export const SET_COMMENT = 'SET_COMMENT'

const useCommentsAction = () => {

    const setComments = useSetRecoilState(commentsState)
    const usersDispatcher = useUsersAction()

    const dispatch = (type, payload) => {
        switch(type){
            case SET_COMMENTS: {
                const { comments } = payload
                const users = _.compact(_.keyBy(comments, 'user'))
                usersDispatcher(SET_USERS, {users})
                const commentsObject = _.keyBy(comments.map(({user, ...comment}) => comment), 'id')
                setComments(comments => ({...comments, ...commentsObject}))
                break;
            }

            case SET_COMMENT: {
                const { comment } = payload
                dispatch(SET_COMMENTS, {comments: [comment]})
                break;
            }
        }
    }

    return dispatch
}

export default useCommentsAction