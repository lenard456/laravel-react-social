import { useEffect } from 'react'
import { Avatar, Button } from "antd";
import { fetchSuggestions } from '@/js/apis/UserApi';
import { useFetch } from '@/js/utils';
import useUsersState from '@/js/states/useUsersState';

export default function () {
    const { updateUsers } = useUsersState()
    const { isLoading, data: users, status } = useFetch(fetchSuggestions, { executeOnMount: true })

    useEffect(() => {
        if (status === 'success') {
            updateUsers(users)
        }
    },[status])

    return (
        <div className='bg-white rounded-lg border border-solid p-4 border-gray-300'>
            <div className='flex justify-between mb-4'>
                <span className='font-bold'>Who to follow?</span>
                <a href='#'>See all</a>
            </div>

            <div className='space-y-2'>
                {
                    users && users.map((user) => (
                        <div key={user.id} className='flex justify-between'>
                            <div className='flex gap-2'>
                                <Avatar className='flex-shrink-0' />
                                <span>{user.name}</span>
                            </div>
                            <Button>Follow</Button>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}