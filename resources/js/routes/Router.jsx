import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthRoutes from './_guards/AuthRoutes'
import GuestRoutes from './_guards/GuestRoutes'

import HomePage from '@/js/pages/home'
import LoginPage from '@/js/pages/login'
import RegisterPage from '@/js/pages/register'

export default function() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<AuthRoutes/>}>
                    <Route index element={<HomePage />}/>
                </Route>

                <Route path='/' element={<GuestRoutes/>}>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}