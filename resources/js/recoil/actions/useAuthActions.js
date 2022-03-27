import { Cache } from "@/js/utils"
import { useSetRecoilState } from "recoil"
import authState from "../states/authState"
import useFeedAction, { RESET_FEED } from "./useFeedAction"
import useUsersAction, { SET_USER } from "./useUsersAction"

const useAuthActions = () => {

    const setAuthState = useSetRecoilState(authState)
    const usersDispatcher = useUsersAction()
    const feedDispatcher = useFeedAction()

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
        feedDispatcher(RESET_FEED)
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