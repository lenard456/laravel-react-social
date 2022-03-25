import { useSetRecoilState } from "recoil"
import feedState from "../states/feedState"
import { union, map } from 'lodash'
import usePostsAction, { SET_POST, SET_POSTS } from "./usePostsAction"

export const SET_FEED = 'SET_FEED'
export const PREPEND_POST = 'PREPEND_POST'

const useFeedAction = () => {
    
    const setFeedState = useSetRecoilState(feedState)
    const postsDispatcher = usePostsAction()

    const dispatch = (type, payload) => {
        switch (type) {

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