import { useState } from 'react'
import { Dropdown, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import AvatarMenu from './HeaderAvatarMenu'

export default function () {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dropdown onVisibleChange={setIsOpen} visible={isOpen} trigger={['click']} overlay={<AvatarMenu setIsOpen={setIsOpen}/>} placement='bottomRight'>
            <Avatar onClick={()=>setIsOpen(true)} className='ml-8' size='large' icon={<UserOutlined />}/>
        </Dropdown>
    )
}