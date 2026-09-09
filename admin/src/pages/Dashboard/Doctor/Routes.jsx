import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import Appointments from './Appointments'
import Profile from './Profile'
import { useAuth } from '../../../context/AuthContext'
import UnauthorizedAccessPage from '../../UnauthorizedAccessPage'
const index = () => {
     const {isAuth,user}=useAuth();
  if (!isAuth || user?.role !== "doctor") {
    return <UnauthorizedAccessPage />;
  }
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='appointments' element={<Appointments/>}></Route>
        <Route path='profile' element={<Profile/>}></Route>
    </Routes>
  )
}

export default index