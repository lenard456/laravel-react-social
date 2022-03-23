import { useEffect } from 'react'
import { followUser } from '@/js/apis/UserApi'
import { useAuth } from '@/js/contexts/AuthContext'
import useFollowingState from '@/js/states/useFollowingState'
import { useFetch } from '@/js/utils'
import { Avatar, Button } from 'antd'
import _ from 'lodash'

export default function ({ user }) {
    const { execute, isLoading, status, error } = useFetch(followUser)
    const { setFollowingIds } = useFollowingState()
    const { isFollowing: checkIfFollowing, currentUser } = useAuth()
    const isFollowing = checkIfFollowing(user.id)

    useEffect(() => {
        if (status == 'success') {
            setFollowingIds((followingIds) => {
                const currentUserFollowingIds = followingIds[currentUser.id]
                return {
                    ...followingIds,
                    [currentUser.id]: [...currentUserFollowingIds, user.id]
                }
            })
        } else if (status == 'error') {
            console.log(error)
        }
    }, [status])

    const handleClick = () => {
        if (isLoading || isFollowing) return;
        execute(user.id)
    }

    return (
        <div key={user.id} className='flex justify-between w-full'>
            <div className='flex gap-2'>
                <Avatar src={user.avatar} className='flex-shrink-0' />
                <span>{user.name}</span>
            </div>
            <Button loading={isLoading} onClick={handleClick}>{ isFollowing ? 'Following' : 'Follow' }</Button>
        </div>
    )
}