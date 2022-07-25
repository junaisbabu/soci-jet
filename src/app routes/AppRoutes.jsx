import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ExplorePage from '../pages/ExplorePage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'
import SignupPage from '../pages/SignupPage'

function AppRoutes() {
  return (
    <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/explore' element={<ExplorePage />} />
    </Routes>
  )
}

export default AppRoutes