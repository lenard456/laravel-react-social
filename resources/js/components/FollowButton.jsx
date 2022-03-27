import { useMemo, useEffect } from 'react'
import { followUser, unFollowUser } from "../apis/UserApi";
import { useApi } from "../hooks";
import { useCurrentUserFollowingIds, useIsFollowedByCurrentUser } from "../recoil/selectors/currentUserSelector";
import { Button } from 'antd'
import { CheckOutlined, UserAddOutlined } from '@ant-design/icons'
import useFollowingIdsAction, { APPEND_FOLLOWING_ID, REMOVE_FOLLOWING_ID } from '../recoil/actions/useFollowingIdsAction';
import { useRecoilValue } from 'recoil';
import authState from '../recoil/states/authState';

const toggleFollow = async (userId, isFollowing) => {
    if (isFollowing) {
        return await unFollowUser(userId)
    } 
    return await followUser(userId)
}

export default function FollowButton({ userId, ...props }) {
    const isFollowedByCurrentUser = useIsFollowedByCurrentUser(userId)
    const { currentUserId  } = useRecoilValue(authState)
    const { execute, isLoading, status, setStatus } = useApi(toggleFollow)
    const followingIdsDispatcher = useFollowingIdsAction()

    useEffect(() => {
        if (status == 'success') {
            if (isFollowedByCurrentUser) {
                followingIdsDispatcher(REMOVE_FOLLOWING_ID, {
                    userId: currentUserId,
                    followingId: userId
                })
            } else {
                followingIdsDispatcher(APPEND_FOLLOWING_ID, {
                    userId: currentUserId,
                    followingId: userId
                })
            }
            setStatus('idle')
        } 
    }, [status, isFollowedByCurrentUser])

    const handleClick = () => {
        if (isLoading) return;
        execute(userId, isFollowedByCurrentUser)
    }

    if (userId == currentUserId) return null

    return (
        <Button 
            shape='round'
            className={isFollowedByCurrentUser ? `bg-blue-50 border-blue-400 text-blue-400` : `bg-transparent`}
            loading={isLoading} 
            icon={ isFollowedByCurrentUser ? <CheckOutlined /> : <UserAddOutlined />}
            onClick={handleClick}
            {...props}
        >{ isFollowedByCurrentUser ? 'Following' : 'Follow' }</Button>
    )
}