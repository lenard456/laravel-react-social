import { RecoilRoot } from 'recoil'
import Router from './routes/Router'


export default function() {
    return (
        <RecoilRoot>
            <Router />
        </RecoilRoot>
    )
}