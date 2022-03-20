import { useAuthAction } from '@/js/recoil/actions'

export default function() {

    const { logout } = useAuthAction()

    return (
        <div>
            <div>Hello</div>
            <button onClick={()=>logout()}>Logout</button>
        </div>
    ) 
}