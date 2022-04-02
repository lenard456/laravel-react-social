import { useEffect } from 'react'
import { fetchUser } from "@/js/apis/UserApi"
import { useApi } from "@/js/hooks"
import useUser from "@/js/recoil/selectors/useUser"
import { Avatar, Comment, Input, PageHeader, Spin } from "antd"
import { useParams } from "react-router-dom"
import { useRecoilValue } from 'recoil'
import currentUserSelector from '@/js/recoil/selectors/currentUserSelector'
import WriteMessage from './components/WriteMessage'

export default function Conversation()
{
    const { isLoading, execute } = useApi(fetchUser)
    const currentUser = useRecoilValue(currentUserSelector)
    const { id } = useParams()
    const user = useUser(id)

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

                <div className='flex-grow bg-yellow-300'>

                </div>

                <WriteMessage id={id}/>

              </div>
    )
}