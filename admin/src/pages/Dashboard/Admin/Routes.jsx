import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import AddDoctor from './AddDoctor'
import Appointments from './Appointments'
import DoctorList from './DoctorList'
import { useAuth } from '../../../context/AuthContext'
import UnauthorizedAccessPage from '../../UnauthorizedAccessPage'
const index = () => {
  const {isAuth,user}=useAuth();
  if (!isAuth || user?.role !== "admin") {
    return <UnauthorizedAccessPage />;
  }
  return (
    <Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='appointments' element={<Appointments/>}></Route>
<Route path='add-doctor' element={<AddDoctor/>}></Route>
<Route path='doctor-list' element={<DoctorList/>}></Route>
    </Routes>
  )
}

export default index


