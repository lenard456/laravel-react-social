import { useEffect } from 'react'
import { useAuth } from "@/js/contexts/AuthContext"
import { LikeFilled, LikeOutlined } from "@ant-design/icons"
import { Spin } from 'antd'
import { likePost, unLikePost } from "@/js/apis/PostApi"
import { useFetch } from "@/js/utils"
import usePostsState from '@/js/states/usePostsState'
import _ from 'lodash'

const toggleLike = async(isLiked, postId) => {
    if (isLiked) {
        return await unLikePost(postId)
    } else {
        return await likePost(postId)
    }
}

export default function ({ post }) {
    const { isLoading, status, data:newLikerIds, execute } = useFetch(toggleLike)

    const { likerIds, id } = post
    const { setPost } = usePostsState()
    const { currentUser } = useAuth()
    const isLiked = likerIds.some(liker_id => liker_id == currentUser.id)

    useEffect(() => {
        if (status == 'success') {
            setPost({
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