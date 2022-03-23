import { useEffect, useState } from 'react'
import { Avatar, Button, List } from "antd";
import { fetchSuggestions } from '@/js/apis/UserApi';
import { useFetch } from '@/js/utils';
import useUsersState from '@/js/states/useUsersState';
import SuggestionItem from './SuggestionItem'

export default function () {
    const { updateUsers } = useUsersState()
    const [suggestions, setSuggestions] = useState([])
    const { isLoading, data, status } = useFetch(fetchSuggestions, { executeOnMount: true })

    useEffect(() => {
        if (status === 'success') {
            updateUsers(data)
            setSuggestions(data)
        }
    },[status])

    return (
        <div className='bg-white rounded-lg border-gray-300'>
            <List 
                bordered
                size='small'
                loading={isLoading}
                dataSource={suggestions}
                header={
                    <div className='flex justify-between p-2'>
                        <span className='font-bold'>Who to follow?</span>
                        <a href='#'>See all</a>
                    </div>
                }
                renderItem={ item => (
                    <List.Item><SuggestionItem user={item} /></List.Item>
                )}
            />
        </div>
    )
}