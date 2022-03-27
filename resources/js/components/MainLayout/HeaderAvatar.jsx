import { useState } from 'react'
import { Dropdown, Avatar } from 'antd'
import AvatarMenu from './HeaderAvatarMenu'
import { useRecoilValue } from 'recoil'
import currentUserSelector from '@/js/recoil/selectors/currentUserSelector'

export default function () {

    const [isOpen, setIsOpen] = useState(false)
    const { avatar } = useRecoilValue(currentUserSelector)

    return (
        <Dropdown onVisibleChange={setIsOpen} visible={isOpen} trigger={['click']} overlay={<AvatarMenu setIsOpen={setIsOpen}/>} placement='bottomRight'>
            <Avatar onClick={()=>setIsOpen(true)} className='ml-8' size='large' src={avatar} />
        </Dropdown>
    )
}