import currentUserSelector from "@/js/recoil/selectors/currentUserSelector";
import { Avatar, Button, Comment, Input } from "antd";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from 'react'
import { SendOutlined } from "@ant-design/icons";
import { useApi } from "@/js/hooks";
import MessageApi from "@/js/apis/MessageApi";
import useMessagesAction from "@/js/recoil/actions/useMessagesAction";

export default function WriteMessage({ id }){

    const { isLoading, data, status, execute, setStatus } = useApi(MessageApi.send)
    const [content, setContent] = useState('')
    const currentUser = useRecoilValue(currentUserSelector)
    const { appendMessages } = useMessagesAction()

    useEffect(() => {
        if (status === 'success') {
            setContent('')
            appendMessages(id, data)
            setStatus('idle')
        }
    }, [status])

    const handleSubmit = () => {
        if (isLoading || content.trim().length <= 0) return;
        execute(id, content)
    }

    return (
        <Comment
            className='mx-4'
            avatar={<Avatar src={currentUser.avatar} />} 
            content={
                <Input
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    size='large'
                    className='rounded-full'
                    onPressEnter={handleSubmit}
                    placeholder='Write a message'
                    suffix={
                        content.trim().length > 0
                            ? <Button onClick={handleSubmit} loading={isLoading} type='text' size='small' icon={<SendOutlined className='text-blue-500' />} />
                            : <span />
                    }
                />
            }
        />
    )
}