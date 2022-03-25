import { useEffect, useState } from 'react'
import { List } from "antd";
import { fetchSuggestions } from '@/js/apis/UserApi';
import useUsersState from '@/js/states/useUsersState';
import SuggestionItem from './SuggestionItem'
import { useApi } from '@/js/hooks';

export default function () {
    const { dispatch } = useUsersState()
    const [suggestions, setSuggestions] = useState([])
    const { isLoading, data, status } = useApi(fetchSuggestions, { executeOnMount: true })

    useEffect(() => {
        if (status === 'success') {
            dispatch('ADD_OR_UPDATE_USERS', data)
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