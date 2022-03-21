import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import AuthRoutes from './_guards/AuthRoutes'
// import GuestRoutes from './_guards/GuestRoutes'

//import MainLayout from '@/js/components/MainLayout'

//import HomePage from '@/js/pages/home'
//import LoginPage from '@/js/pages/login'
//import RegisterPage from '@/js/pages/register'
import {
    LoginPage
} from '@pages'

export default () => (
    <BrowserRouter>
        <Routes>

{/*            <Route path='/' element={<AuthRoutes/>}>
                <Route path='' element={<MainLayout/>}>
                    <Route index element={<HomePage />}/>
                </Route>
            </Route>*/}

            {/*<Route path='/' element={<GuestRoutes/>}>*/}
                <Route path='/login' element={<LoginPage />} />
                {/*<Route path='/login' element={<LoginPage />} />*/}
                {/*<Route path='/register' element={<RegisterPage />} />*/}
            {/*</Route>*/}

        </Routes>
    </BrowserRouter>
)