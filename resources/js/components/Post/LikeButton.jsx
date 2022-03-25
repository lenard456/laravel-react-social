import { useEffect } from 'react'
import { LikeFilled, LikeOutlined } from "@ant-design/icons"
import { Spin } from 'antd'
import { likePost, unLikePost } from "@/js/apis/PostApi"
import usePostsState from '@/js/states/usePostsState'
import _ from 'lodash'
import { useRecoilValue } from 'recoil'
import { userIdState } from '@/js/states/useAuthStates'
import { useApi } from '@/js/hooks'

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
    const { dispatch } = usePostsState()
    const currentUserId = useRecoilValue(userIdState);
    const isLiked = likerIds.some(liker_id => liker_id == currentUserId)

    useEffect(() => {
        if (status == 'success') {
            dispatch('SET_POST',{
                ...post,
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