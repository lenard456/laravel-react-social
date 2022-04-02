import { useEffect } from 'react'
import { fetchUser } from "@/js/apis/UserApi"
import { useApi } from "@/js/hooks"
import useUser from "@/js/recoil/selectors/useUser"
import { PageHeader, Spin } from "antd"
import { useParams } from "react-router-dom"
import WriteMessage from './components/WriteMessage'
import useUsersAction from '@/js/recoil/actions/useUsersAction'
import MessagesList from './components/MessagesList'

export default function Conversation()
{
    const { execute, data, status } = useApi(fetchUser)
    const { setUser } = useUsersAction()
    const { id } = useParams()
    const user = useUser(id)

    useEffect(() => {
        if (status === 'success') {
            setUser(data)
        }
    }, [status])

    useEffect(() => {
        if (!user) {
            execute(id)
        }
    }, [id])

    return (
        !user
            ? <>
                <div className='flex items-center justify-center h-full'>
                    <Spin spinning={true} />
                </div>
              </>
            : <div className='flex flex-col h-full'>
                <PageHeader 
                    className='border-b border-gray-200'
                    title={user.name}
                    avatar={{src: user.avatar}}
                />

                <div className='flex-grow px-2'>
                    <MessagesList id={id}/>
                </div>

                <WriteMessage id={id}/>

              </div>
    )
}