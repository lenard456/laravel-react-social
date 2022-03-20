import { useState } from 'react'
import { Avatar, Input, Button } from 'antd'
import { UserOutlined, CameraFilled } from '@ant-design/icons'
import { usePostAction } from '@/js/recoil/actions'

export default function () {

    const [isLoading, setIsLoading] = useState(false)
    const [content, setContent] = useState('')
    const { createPost } = usePostAction()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLoading) return

        setIsLoading(true)

        try {
            await createPost(content)
        } catch(e) { console.log(e) }
        finally {
            setIsLoading(false)
            setContent('')
        }
    }

    return (
        <div className='flex gap-2 bg-white rounded-lg border border-solid p-4 border-gray-300'>
            <Avatar size='large' icon={<UserOutlined />} />
            <form onSubmit={handleSubmit} className='flex-grow flex flex-col gap-2'>
                <Input.TextArea 
                    onChange={e=>setContent(e.target.value)} 
                    className='rounded-lg' 
                    rows={2} 
                    placeholder='Write something...'
                    value={content}
                />
                <div className='flex justify-between'>
                    <div className='space-x-2'>
                        <CameraFilled/>
                        <span>Attach a photo</span>
                    </div>
                    <Button loading={isLoading} htmlType='submit' className='btn-green'>Share</Button>
                </div>

            </form>

        </div>
    )
}