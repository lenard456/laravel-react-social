import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <div>Home Page</div>
                }/>
                <Route path='/login' element={
                    <div>Login Page</div>
                }/>
            </Routes>
        </BrowserRouter>
    )
}