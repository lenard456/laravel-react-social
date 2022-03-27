import { fetchFollowing } from '@/js/apis/UserApi'
import LoadMore from '@/js/components/LoadMore'
import UserItem, { UserItemSkeleton } from '@/js/components/UserItem'
import { useApi } from '@/js/hooks'
import { List, Skeleton } from 'antd'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ProfileFollowingPage() {

    const { id } = useParams()
    const { execute, status, setStatus, data, isLoading } = useApi(fetchFollowing)
    const [followingData, setFollowingData] = useState({ currentPage: 0, lastPage: null, users: [] })
    const { currentPage, lastPage, users } = followingData
    const [initLoading, setInitLoading] = useState(false)

    useEffect(() => {
        if (status === 'success') {
            setFollowingData(({ users }) => ({
                currentPage: data.current_page,
                lastPage: data.last_page,
                users: [...users, ...data.data]
            }))
            setStatus('idle')
        }
    }, [status])

    useEffect(() => {
        setInitLoading(true)
        execute(id).then(() => setInitLoading(false))
    }, [id])

    const seeMore = () => {
        execute(id, currentPage + 1)
    }

    return (
        <div className='bg-white rounded-lg border-gray-300'>
            <List
                size='large'
                bordered
                loading={initLoading}
                loadMore={<LoadMore className={'mb-4'} seeMore={seeMore} isLoading={isLoading} hasNext={lastPage && currentPage < lastPage} />}
                dataSource={isLoading ? [...users, ...Array(3).fill({isLoading:true})] : users}
                renderItem={user => (
                    <List.Item>
                        <UserItem user={user} />
                    </List.Item>
                )}
            />
        </div>
    )
}