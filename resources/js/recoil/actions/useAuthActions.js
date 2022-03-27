import { Cache } from "@/js/utils"
import { useSetRecoilState } from "recoil"
import authState from "../states/authState"
import useFeedAction from "./useFeedAction"
import useUsersAction, { SET_USER } from "./useUsersAction"

const useAuthActions = () => {

    const setAuthState = useSetRecoilState(authState)
    const usersDispatcher = useUsersAction()
    const { resetFeed } = useFeedAction()

    const setCurrentUser = (user) => {
        usersDispatcher(SET_USER, {user})
        setAuthState({
            isAuthenticated: Cache.set('isAuthenticated', true),
            currentUserId: user.id
        })
    }

    const setAuthenticated = () => {
        setAuthState({
            isAuthenticated: Cache.set('isAuthenticated', true),
            currentUserId: null
        })
    }

    const removeCurrentUser = () => {
        resetFeed()
        setAuthState({
            isAuthenticated: Cache.set('isAuthenticated', false),
            currentUserId: null
        })
    }

    return {
        setCurrentUser,
        setAuthenticated,
        removeCurrentUser,
    }
}

export default useAuthActions