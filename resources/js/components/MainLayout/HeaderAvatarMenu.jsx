import { Modal, Avatar, Divider, Menu, message } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import AuthApi from '@apis/AuthApi'
import { useAuth } from '@contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default ({ setIsOpen }) => {

    const { invalidateSession } = useAuth()
    const navigate = useNavigate()

    const menuClicked = ({key}) => {
        if (key === 'logout') {
            setIsOpen(false)
            Modal.confirm({
                title: 'Confirm logout',
                content: 'Are you sure to logout?',
                onOk() {
                    return AuthApi.logout().then(()=>{
                        message.success('Logout successfully')
                        invalidateSession()
                        navigate('/login')
                    }).catch(console.log)
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