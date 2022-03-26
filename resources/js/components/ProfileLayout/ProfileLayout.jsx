import { Avatar, Card } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { NavLink, Outlet } from 'react-router-dom'

export default () => {
    return (
        <>
            <div className='h-60 lg:h-80 bg-gray-500 relative'>
                <img className='w-full h-full object-cover' src='https://source.unsplash.com/oDhGIbegZNI/1400x900' />
            </div>

            <div className='max-w-5xl mx-auto -translate-y-28'>

                <div className='flex flex-col items-center lg:items-end gap-4 lg:flex-row translate'>
                    <div>
                        <Avatar className='border-2 border-white' size={224} icon={<UserOutlined />} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col items-center lg:flex-row'>
                            <div className='text-3xl font-bold text-gray-800'>Lenard Mangay-ayam</div>
                        </div>
                        <div className='profile-navlinks'>
                            <NavLink to='/profile/2' end className='profile-navlinks-item'>Post</NavLink>
                            <NavLink to='/profile/2/about' className='profile-navlinks-item'>About</NavLink>
                            <NavLink to='/profile/2/following' className='profile-navlinks-item'>Following</NavLink>
                            <NavLink to='/profile/2/follower' className='profile-navlinks-item'>Follower</NavLink>
                            <NavLink to='/profile/2/saved' className='profile-navlinks-item'>Saved</NavLink>
                        </div>
                    </div>
                </div>

                <div className='mt-8 grid grid-cols-4 gap-4'>
                    <div>
                        <Card>
                            lorem ipsum
                        </Card>
                    </div>

                    <div className='col-span-2'>
                        <Outlet />
                    </div>


                </div>

            </div>
        </>
    )
}