import { Avatar, List, Skeleton } from 'antd'
import _ from 'lodash'
import FollowButton from '@/js/components/FollowButton'

export const UserItemSkeleton = function ({ count = 3 }) {
    return (
        <div className='flex justify-between w-full'>
            <div className='flex gap-2'>
                <Skeleton.Avatar active className='flex-shrink-0' />
                <Skeleton.Input size='small' />
            </div>
            <Skeleton.Button shape='round' active />
        </div>
    )
}

export default function UserItem({ user }) {
    if (user.isLoading) return <UserItemSkeleton />
    return (
        <div key={user.id} className='flex justify-between w-full'>
            <div className='flex gap-2'>
                <Avatar src={user.avatar} className='flex-shrink-0' />
                <span>{user.name}</span>
            </div>
            <FollowButton userId={user.id} />
        </div>
    )
}