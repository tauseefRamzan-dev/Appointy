import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import Login from "./pages/Auth/Login"
import AdminDashboard from './pages/Dashboard/Admin/index'
import DoctorDashboard from './pages/Dashboard/Doctor/index'
import UnauthorizedAccessPage from './pages/UnauthorizedAccessPage'
import PageNotFound from './pages/PageNotFound'
import { useAuth } from './context/AuthContext'

const Index = () => {
  const { user, isAuth, isLoading }= useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path='/' 
        element={!isAuth ?<Login />:<Navigate to={user?.role==="admin"? "/dashboard-admin" : "/dashboard-doctor"} replace />} 
      />
      <Route 
        path='/dashboard-admin/*' 
        element={
          !isAuth ? <Navigate to="/" replace />: 
          user?.role==="admin" ?<AdminDashboard />:<UnauthorizedAccessPage />
        } 
      />
      <Route 
        path='/dashboard-doctor/*' 
        element={
          !isAuth? <Navigate to="/" replace /> : 
          user?.role==="doctor" ? <DoctorDashboard />:<UnauthorizedAccessPage />
        } 
      />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}
export default Index;