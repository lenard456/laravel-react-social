import { useEffect } from 'react'
import { EditOutlined, MessageOutlined } from "@ant-design/icons";
import { Avatar, Button, List, PageHeader } from "antd";
import { useApi } from '@/js/hooks';
import { fetchConversations } from '@/js/apis/UserApi';
import { Link, Outlet } from 'react-router-dom';
import useConversationsAction from '@/js/recoil/actions/useConversationsAction';
import { useRecoilValue } from 'recoil';
import conversationsSelector from '@/js/recoil/selectors/conversationsSelector';

export default function MessagesLayout() {

    const { setConversations } = useConversationsAction()
    const { data, status } = useApi(fetchConversations, {executeOnMount: true})
    const conversations = useRecoilValue(conversationsSelector)

    useEffect(() => {
        if (status === 'success') {
            setConversations(data)
        }
    }, [status])

    return (
        <div className='bg-white border flex border-gray-200 rounded-lg flex-grow w-full max-w-5xl mx-auto lg:my-4'>
            <div className='border-r border-gray-200 min-w-[300px]'>
                <PageHeader 
                    className='border-b border-gray-200'
                    title='Conversations'
                    extra={[
                        <Button type='text' shape='circle' key='new-message' icon={<EditOutlined />} />
                    ]}
                />

                <List
                    className='border-b border-gray-200'
                    dataSource={conversations}
                    renderItem={user => (
                        <List.Item>
                            <Link to={`/messages/${user.id}`} className='w-full px-4 flex gap-2 items-center'>
                                <Avatar size='large' src={user.avatar} />
                                <div className='flex flex-col h-full flex-grow leading-4'>
                                    <span className='font-semibold'>{user.name}</span>
                                    <span>5 new messages</span>
                                </div>
                            </Link>
                        </List.Item>
                    )}
                />

            </div>
            <div className='flex-grow'>
                <Outlet />
            </div>
        </div>
    )

}