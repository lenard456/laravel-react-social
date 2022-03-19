import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LoginPage from './pages/login'
import RegisterPage from './pages/register'

export default function() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <div>Home Page</div>
                }/>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />

            </Routes>
        </BrowserRouter>
    )
}