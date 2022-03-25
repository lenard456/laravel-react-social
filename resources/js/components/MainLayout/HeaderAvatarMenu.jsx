import { Modal, Avatar, Divider, Menu } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import AuthApi from '@apis/AuthApi'
import { useApi } from '@/js/hooks'
import { useAuthState } from '@/js/states'

export default ({ setIsOpen }) => {
    const { execute:logout, message, navigate } = useApi(AuthApi.logout) 
    const { dispatch } = useAuthState()

    const menuClicked = ({key}) => {
        if (key === 'logout') {
            setIsOpen(false)
            Modal.confirm({
                title: 'Confirm logout',
                content: 'Are you sure to logout?',
                async onOk() {
                    await logout()
                    message.success('Logout successully')
                    dispatch('LOGOUT')
                    navigate('/login')
                    // return AuthApi.logout().then(()=>{
                    //     message.success('Logout successfully')
                    //     invalidateSession()
                    //     navigate('/login')
                    // }).catch(console.log)
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