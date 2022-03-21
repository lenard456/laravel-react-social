import Routes from './routes'
import { AuthProvider } from '@contexts/AuthContext'
import { ReactQueryDevtools } from 'react-query-devtools'

export default function() {
    return (
        <>
        <AuthProvider>
            <Routes />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false}/>
        </>
    )
}