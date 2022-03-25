import Routes from './routes'
import { RecoilRoot } from 'recoil'

export default function() {
    return (
        <RecoilRoot>
            <Routes />
        </RecoilRoot>
    )
}