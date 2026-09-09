import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Frontend/Home'
import Doctors from './Frontend/Doctors'
import About from './Frontend/About'
import Contact from './Frontend/Contact'
import Auth from './Auth/index'
import ScrollToTop from '../components/ScrollToTop'
import MyProfile from './Frontend/MyProfile'
import MyAppointments from './Frontend/MyAppointments'
import Appointment from './Frontend/Appointment'
import ProtectedRoute from '../components/ProtectedRoute' // ProtectedRoute import karein
import { useAuth } from '../context/AuthContext'
import { FloatButton, Spin } from 'antd'
import PageNotFound from './Frontend/PageNotFound'
const index=()=>{
  const { isLoading }=useAuth();
  if(isLoading) 
    {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }
  return (
    <>
      <ScrollToTop/>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/doctors' element={<Doctors/>} />
          <Route path='/doctors/:speciality' element={<Doctors/>} />
          <Route path='about' element={<About/>} />
          <Route path='contact' element={<Contact/>} />
          <Route path='/auth/*' element={<Auth/>} />
          <Route path='/appointment/:docID' element={<Appointment/>} />
          <Route element={<ProtectedRoute />}>
              <Route path='my-profile' element={<MyProfile/>} />
              <Route path='my-appointments' element={<MyAppointments/>} />
          </Route>
          <Route path='*' element={<PageNotFound/>} />
      </Routes>
     <FloatButton.BackTop 
       visibilityHeight={450} 
       style={{ right: '30px', bottom: '30px' }}
       shape="circle"
       type="primary"
     />
    </>
  )
}

export default index