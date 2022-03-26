import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthenticatedUserOnly from './_guards/AuthenticatedUserOnly'
import GuestOnly from './_guards/GuestOnly'
import {
    LoginPage,
    RegisterPage,
    HomePage,
    PostPage,
    ProfileIndexPage
} from '@pages/'
import { MainLayout, ProfileLayout } from '@components'

export default () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<AuthenticatedUserOnly />}>
                <Route path='' element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='posts/:id' element={<PostPage />} />
                    <Route path='profile/:id' element={<ProfileLayout />} >
                        <Route index element={<ProfileIndexPage />} />
                        <Route path='about' element={<div>About</div>}/>
                        <Route path='following' element={<div>Following</div>}/>
                        <Route path='follower' element={<div>Follower</div>}/>
                        <Route path='saved' element={<div>Saved</div>}/>
                    </Route>
                </Route>
            </Route>

            <Route path='/' element={<GuestOnly/>}>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage/>} />
            </Route>

        </Routes>
    </BrowserRouter>
)