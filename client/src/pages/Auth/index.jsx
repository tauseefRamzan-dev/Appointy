import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

const index = () => {
  return (
    <Routes>
        <Route path='login' element={<Login/>}></Route>
        <Route path='register' element={<Register/>}></Route>
    </Routes>
  )
}

export default index