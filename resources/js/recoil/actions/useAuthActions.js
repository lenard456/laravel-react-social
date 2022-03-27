import { Cache } from "@/js/utils"
import { useSetRecoilState } from "recoil"
import authState from "../states/authState"
import useFeedAction, { RESET_FEED } from "./useFeedAction"
import useUsersAction, { SET_USER } from "./useUsersAction"

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED'

const useAuthActions = () => {

    const setAuthState = useSetRecoilState(authState)
    const usersDispatcher = useUsersAction()
    const feedDispatcher = useFeedAction()

    const dispatch = (type, payload) => {
        switch(type) {
            case SET_CURRENT_USER : {
                const { user } = payload
                usersDispatcher(SET_USER, payload)
                setAuthState({
                    isAuthenticated: Cache.set('isAuthenticated', true),
                    currentUserId: user.id
                })
                break;
            }

            case SET_AUTHENTICATED: {
                setAuthState({
                    isAuthenticated: Cache.set('isAuthenticated', true),
                    currentUserId: null
                })
                break;
            }

            case REMOVE_CURRENT_USER: {
                feedDispatcher(RESET_FEED)
                setAuthState({
                    isAuthenticated: Cache.set('isAuthenticated', false),
                    currentUserId: null
                })
                break;
            }
        }
    }

    return dispatch
}

export default useAuthActions