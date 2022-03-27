import { useSetRecoilState } from "recoil"
import commentsState from "../states/commentsState"
import _ from 'lodash'
import useUsersAction from "./useUsersAction"

const useCommentsAction = () => {

    const setCommentsState = useSetRecoilState(commentsState)
    const { setUsers } = useUsersAction()

    const setComments = (comments) => {
        const users = _.compact(_.map(comments, 'user'))
        setUsers(users)
        const commentsObject = _.keyBy(comments.map(({user, ...comment}) => comment), 'id')
        setCommentsState(comments => ({...comments, ...commentsObject}))
    }

    const setComment = (comment) => {
        setComments([comment])
    }

    return { setComments, setComment }
}

export default useCommentsAction