import { atom, useRecoilState } from "recoil";
import useUsersState from "./useUsersState";

export const commentsState = atom({
    key: 'comments',
    default: {}
})

const reducer = (comments, type, payload) => {
    switch(type) {

        case 'SET_COMMENT': {
            const comment = payload
            return {...comments, [comment.id] : comment}
        }

        case 'SET_COMMENTS': {
            const newComments = payload
            return newComments.reduce((acm, comment) => {
                return {...acm, [comment.id]: comment}
            }, comments)
        }

        default:
            return comments;
    }
}

const useCommentsState = function() {
    const [comments, setComments] = useRecoilState(commentsState)
    const { dispatch:dispatchUserState } = useUsersState()

    const extract = (type, payload) => {
        switch (type) {
            case 'SET_COMMENTS': {
                let extracted = []
                payload.forEach(({user, ...comment}) => {
                    if(user) dispatchUserState('ADD_OR_UPDATE_USER', user);
                    extracted = [...extracted, comment]
                })
                return extracted
            }
            case 'SET_COMMENT': {
                const { user, ...comment } = payload
                if (user) dispatchUserState('ADD_OR_UPDATE_USER', user)
                return comment;
            }
            default:
                return payload
        }
    }

    const dispatch = (type, payload) => {
        const extracted = extract(type, payload)
        setComments(comments => reducer(comments, type, extracted))
    }

    return {
        comments,
        dispatch
    }
}

export default useCommentsState