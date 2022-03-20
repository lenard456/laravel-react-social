import { useState } from 'react'
import { Dropdown, Modal, Avatar, Divider, Menu } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useAuthAction } from '@/js/recoil/actions'

const AvatarMenu = ({ setIsOpen }) => {

    const { logout } = useAuthAction()

    const menuClicked = ({key}) => {
        if (key === 'logout') {
            setIsOpen(false)
            Modal.confirm({
                title: 'Confirm logout',
                content: 'Are you sure to logout?',
                onOk() {
                    return logout().catch(console.log)
                }
            })
        }
    }
    
    return (
        <div className='bg-white p-4 shadow'>
            <div className='flex items-center gap-4'>
                <Avatar icon={<UserOutlined/>} size={60}/>
                <div className='flex flex-col leading-3 text-gray-700'>
                    <span className='text-lg font-bold'>Lenard Mangay-ayam</span>
                    <span>See your profile</span>
                </div>
            </div>

            <Divider className='my-4'/>

            <Menu onClick={menuClicked} className='text-base'>
                <Menu.Item key='logout' icon={<LogoutOutlined />}>Logout</Menu.Item>
            </Menu>


        </div>
    )    
}

export default function () {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dropdown onVisibleChange={setIsOpen} visible={isOpen} trigger={['click']} overlay={<AvatarMenu setIsOpen={setIsOpen}/>} placement='bottomRight'>
            <Avatar onClick={()=>setIsOpen(true)} className='ml-8' size='large' icon={<UserOutlined />}/>
        </Dropdown>
    )
}