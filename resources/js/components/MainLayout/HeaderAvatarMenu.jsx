import { Modal, Avatar, Divider, Menu } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import AuthApi from '@apis/AuthApi'
import { useApi } from '@/js/hooks'
import { useRecoilValue } from 'recoil'
import currentUserSelector from '@/js/recoil/selectors/currentUserSelector'
import useAuthActions, { REMOVE_CURRENT_USER } from '@/js/recoil/actions/useAuthActions'

export default ({ setIsOpen }) => {
    const { execute:logout, message, navigate } = useApi(AuthApi.logout) 
    const authDispatcher = useAuthActions()
    const currentUser = useRecoilValue(currentUserSelector)

    const menuClicked = ({key}) => {
        if (key === 'logout') {
            setIsOpen(false)
            Modal.confirm({
                title: 'Confirm logout',
                content: 'Are you sure to logout?',
                async onOk() {
                    await logout()
                    message.success('Logout successully')
                    authDispatcher(REMOVE_CURRENT_USER)
                    navigate('/login')
                }
            })
        }
    }
    
    return (
        <div className='bg-white p-4 shadow'>
            <div className='flex items-center gap-4'>
                <Avatar src={currentUser.avatar} size={60}/>
                <div className='flex flex-col leading-3 text-gray-700'>
                    <span className='text-lg font-bold'>{currentUser.name}</span>
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