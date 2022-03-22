import Routes from './routes'
import { AuthProvider } from '@contexts/AuthContext'
import { ReactQueryDevtools } from 'react-query-devtools'
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