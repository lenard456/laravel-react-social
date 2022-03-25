import { useSetRecoilState } from "recoil"
import postsState from "../states/postsState"
import _ from 'lodash'
import useUsersAction, { SET_USERS } from "./useUsersAction"
import usePostsCommentIdsAction, { SET_POST_COMMENT_IDS } from "./usePostsCommentIdsAction"

export const SET_POSTS = 'SET_POSTS'
export const SET_POST = 'SET_POST'
export const SET_POST_LIKER_IDS = 'SET_POST_LIKER_IDS'

const usePostsAction = () => {
    
    const setPosts = useSetRecoilState(postsState)
    const usersDispatcher = useUsersAction()
    const postsCommentIdsDispatcher = usePostsCommentIdsAction()

    const dispatch = (type, payload) => {
        switch(type) {
            case SET_POSTS: {
                const { posts:newPosts } = payload
                const users = _.compact(_.map(newPosts,'user'))                
                usersDispatcher(SET_USERS, {users})

                newPosts.forEach(({id, comments}) => {
                    if(comments) postsCommentIdsDispatcher(SET_POST_COMMENT_IDS, {postId: id, comments})
                });

                const newPostsObject = _.keyBy(newPosts.map(({user, comments, ...post})=>post), 'id')

                setPosts(posts => {
                    return {...posts, ...newPostsObject}
                })
                break;
            }

            case SET_POST: {
                const { post } = payload
                dispatch(SET_POSTS, { posts: [post] })
                break;
            }

            case SET_POST_LIKER_IDS: {
                const { postId, likerIds } = payload
                setPosts(posts => {
                    const post = posts[postId]
                    return {...posts, [postId]: {...post, likerIds} }
                })
            }
        }
    }

    return dispatch
}

export default usePostsAction