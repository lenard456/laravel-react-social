import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthenticatedUserOnly from './_guards/AuthenticatedUserOnly'
import GuestOnly from './_guards/GuestOnly'
import {
    LoginPage,
    RegisterPage
} from '@pages/'
import { MainLayout } from '@components'

export default () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<AuthenticatedUserOnly />}>
                <Route path='' element={<MainLayout />}>
                    <Route index element={<div>Home</div>} />
                </Route>
            </Route>

            <Route path='/' element={<GuestOnly/>}>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage/>} />
            </Route>

        </Routes>
    </BrowserRouter>
)