import Routes from './routes'
import { AuthProvider } from '@contexts/AuthContext'
import { RecoilRoot } from 'recoil'

export default function() {
    return (
        <RecoilRoot>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </RecoilRoot>
    )
}