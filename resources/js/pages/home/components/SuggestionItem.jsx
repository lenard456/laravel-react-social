import { useEffect, useMemo } from 'react'
import { followUser } from '@/js/apis/UserApi'
import { Avatar, Button } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import _ from 'lodash'
import { useApi } from '@/js/hooks'
import { useCurrentUserFollowingIds } from '@/js/recoil/selectors/currentUserSelector'
import useFollowingIdsAction, { APPEND_FOLLOWING_IDS } from '@/js/recoil/actions/useFollowingIdsAction'
import { useRecoilValue } from 'recoil'
import authState from '@/js/recoil/states/authState'


export default function ({ user }) {
    const { currentUserId } = useRecoilValue(authState)
    const { isCurrentUserFollowing, currentUserFollowingIds } = useCurrentUserFollowingIds()
    const isFollowedByCurrentUser = useMemo(() => isCurrentUserFollowing(user.id), [currentUserFollowingIds])

    const { execute, isLoading, status } = useApi(followUser)
    const followingIdsDispatcher = useFollowingIdsAction()

    useEffect(() => {
        if (status == 'success') {
            followingIdsDispatcher(APPEND_FOLLOWING_IDS, {
                userId: currentUserId,
                followingId: user.id
            })
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