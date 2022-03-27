import { useSetRecoilState } from "recoil"
import feedState from "../states/feedState"
import { union, map } from 'lodash'
import usePostsAction, { SET_POST, SET_POSTS } from "./usePostsAction"

export const SET_FEED = 'SET_FEED'
export const PREPEND_POST = 'PREPEND_POST'
export const RESET_FEED = 'RESET_FEED'

const useFeedAction = () => {
    
    const setFeedState = useSetRecoilState(feedState)
    const postsDispatcher = usePostsAction()

    const dispatch = (type, payload) => {
        switch (type) {

            case RESET_FEED : {
                setFeedState({
                    currentPage: 0,
                    lastPage: null,
                    postIds: []
                })
                break;
            }

            case SET_FEED: {
                const { posts, currentPage, lastPage } = payload
                postsDispatcher(SET_POSTS, {posts})
                setFeedState(({postIds}) => ({
                    currentPage,
                    lastPage,
                    postIds: union(postIds, map(posts, 'id'))
                }))
                break;
            }

            case PREPEND_POST: {
                const { post } = payload
                postsDispatcher(SET_POST, {post})
                setFeedState(({postIds, ...feed}) => {
                    return {
                        ...feed,
                        postIds: [post.id, ...postIds]
                    }
                })
                break;
            }

        }
    }

    return dispatch
}

export default useFeedAction