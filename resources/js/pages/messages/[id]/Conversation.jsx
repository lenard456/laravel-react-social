import { useEffect } from 'react'
import { fetchUser } from "@/js/apis/UserApi"
import { useApi } from "@/js/hooks"
import useUser from "@/js/recoil/selectors/useUser"
import { PageHeader, Spin } from "antd"
import { useParams } from "react-router-dom"
import WriteMessage from './components/WriteMessage'
import useUsersAction from '@/js/recoil/actions/useUsersAction'
import MessagesList from './components/MessagesList'
import ScrollToBottom from 'react-scroll-to-bottom'
import { useRecoilValue } from 'recoil'
import conversationsState from '@/js/recoil/states/conversationIdsState'
import { fetchMessages } from '@/js/apis/MessageApi'
import useConversationsAction from '@/js/recoil/actions/useConversationsAction'
import useMessages from '@/js/recoil/selectors/useMessages'

export default function Conversation()
{
    const { execute, data, status, isLoading } = useApi(fetchMessages)
    const { id } = useParams()
    const { setConversation } = useConversationsAction()
    const conversations = useRecoilValue(conversationsState)
    const conversation = conversations[id]
    const messages = useMessages(id)

    useEffect(() => {
        if (status === 'success') {
            setConversation(data)
        }
    }, [status])

    useEffect(() => {
        execute(id)
    }, [id])

    return (
        !conversation
            ? <>
                <div className='flex items-center justify-center h-full'>
                    <Spin spinning={true} />
                </div>
              </>
            : <div className='flex flex-col h-full'>
                <PageHeader 
                    className='border-b border-gray-200'
                    title={conversation.name}
                    avatar={{src: conversation.avatar}}
                />

                { isLoading && messages.length <= 0
                    ? <div className='flex-grow flex items-center justify-center'>
                        <Spin spinning />
                    </div>
                    : 
                        <ScrollToBottom className='child-scroller flex-grow pl-2 max-h-full overflow-y-hidden'>
                            <MessagesList messages={messages}/>
                        </ScrollToBottom>
                }

                <WriteMessage id={id}/>

              </div>
    )
}