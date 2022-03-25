import { useEffect, useMemo } from 'react'
import { followUser } from '@/js/apis/UserApi'
import { Avatar, Button } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import _ from 'lodash'
import { useCurrentUserState } from '@/js/states/useAuthStates'
import { useApi } from '@/js/hooks'

export default function ({ user }) {
    const { id:currentUserId, useUserFollowingIdState } = useCurrentUserState()
    const { isFollowing, followingIds, dispatch } = useUserFollowingIdState()

    const { execute, isLoading, status, error } = useApi(followUser)
    const isFollowedByCurrentUser = useMemo(() => isFollowing(user.id), [followingIds])

    useEffect(() => {
        if (status == 'success') {
            dispatch('ADD_FOLLOWING_ID', {
                userId: currentUserId,
                followingId: user.id
            })
        } else if (status == 'error') {
            console.log(error)
        }
    }, [status])

    const handleClick = () => {
        if (isLoading || isFollowedByCurrentUser) return;
        execute(user.id)
    }

    return (
        <div key={user.id} className='flex justify-between w-full'>
            <div className='flex gap-2'>
                <Avatar src={user.avatar} className='flex-shrink-0' />
                <span>{user.name}</span>
            </div>
            <Button 
                className={isFollowedByCurrentUser && `border-blue-400 text-blue-400`}
                loading={isLoading} 
                icon={ isFollowedByCurrentUser && <CheckOutlined />}
                onClick={handleClick}
            >{ isFollowedByCurrentUser ? 'Following' : 'Follow' }</Button>
        </div>
    )
}