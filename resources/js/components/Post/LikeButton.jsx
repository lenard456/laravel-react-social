import { useEffect, useMemo } from 'react'
import { LikeFilled, LikeOutlined } from "@ant-design/icons"
import { Spin } from 'antd'
import { likePost, unLikePost } from "@/js/apis/PostApi"
import _ from 'lodash'
import { useRecoilValue } from 'recoil'
import { useApi } from '@/js/hooks'
import authState from '@/js/recoil/states/authState'
import usePostsAction, { SET_POST_LIKER_IDS } from '@/js/recoil/actions/usePostsAction'

const toggleLike = async(isLiked, postId) => {
    if (isLiked) {
        return await unLikePost(postId)
    } else {
        return await likePost(postId)
    }
}

export default function ({ post }) {
    const { isLoading, status, data:newLikerIds, execute } = useApi(toggleLike)

    const { likerIds, id } = post
    const postsDispatcher = usePostsAction()
    const { currentUserId } = useRecoilValue(authState);
    const isLiked = useMemo(() => likerIds.some(liker_id => liker_id == currentUserId), [likerIds])

    useEffect(() => {
        if (status == 'success') {
            postsDispatcher(SET_POST_LIKER_IDS, {
                postId: id,
                likerIds: newLikerIds
            })
        }
    }, [status])

    const handleClick = () => {
        if (isLoading) return;
        execute(isLiked, id)
    }

    return (
        <button onClick={handleClick} className='cursor-pointer flex-grow py-1 bg-white hover:bg-gray-100 rounded-full'>
            <Spin spinning={isLoading}>
                {isLiked
                    ? <LikeFilled className='text-blue-500' />
                    : <LikeOutlined />
                }
            </Spin>
        </button>
    )
}