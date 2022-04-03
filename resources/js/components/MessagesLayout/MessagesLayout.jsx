import { useEffect, useMemo } from 'react'
import { EditOutlined, MessageOutlined } from "@ant-design/icons";
import { Avatar, Button, List, PageHeader } from "antd";
import { useApi } from '@/js/hooks';
import { fetchConversations } from '@/js/apis/UserApi';
import { Link, Outlet } from 'react-router-dom';
import useConversationsAction from '@/js/recoil/actions/useConversationsAction';
import { useRecoilValue } from 'recoil';
import conversationsState from '@/js/recoil/states/conversationIdsState';
//import conversationsSelector from '@/js/recoil/selectors/conversationsSelector';

export default function MessagesLayout() {

    const { setConversations } = useConversationsAction()
    const { data, status } = useApi(fetchConversations, {executeOnMount: true})
    const conversationsObject = useRecoilValue(conversationsState)
    const conversations = useMemo(() => Object.values(conversationsObject), [conversationsObject])

    useEffect(() => {
        if (status === 'success') {
            setConversations(data)
        }
    }, [status])

    return (
        <div style={{height: 'calc(100vh - 4rem)'}} className='lg:py-4'>
        <div className='bg-white border flex border-gray-200 rounded-lg flex-grow w-full h-full max-w-5xl mx-auto'>
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
                    renderItem={conversation => (
                        <List.Item>
                            <Link to={`/messages/${conversation.thread_id}`} className='w-full px-4 flex gap-2 items-center'>
                                <Avatar size='large' src={conversation.avatar} />
                                <div className='flex flex-col h-full flex-grow leading-4'>
                                    <span className='font-semibold'>{conversation.name}</span>
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
        </div>
    )

}