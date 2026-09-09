import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  // Hardcoded role for demonstration (change to 'admin', 'doctor', or null as needed)
  const role = 'admin' 

  return (
    <div className="d-flex flex-column vh-100 bg-white border-end" style={{ width: '280px' }}>
      {role === 'admin' && (
        <ul className="nav flex-column mt-3">
          <li className="nav-item">
            <NavLink to={'/admin-dashboard'} className={({ isActive }) => `nav-link d-flex align-items-center gap-3 py-3 px-4 text-secondary ${isActive ? 'bg-light border-end border-primary border-4 text-dark' : ''}`}>
              <img style={{ width: '20px' }} src={assets.home_icon} alt='' />
              <span className="d-none d-md-inline">Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/all-appointments'} className={({ isActive }) => `nav-link d-flex align-items-center gap-3 py-3 px-4 text-secondary ${isActive ? 'bg-light border-end border-primary border-4 text-dark' : ''}`}>
              <img style={{ width: '20px' }} src={assets.appointment_icon} alt='' />
              <span className="d-none d-md-inline">Appointments</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/add-doctor'} className={({ isActive }) => `nav-link d-flex align-items-center gap-3 py-3 px-4 text-secondary ${isActive ? 'bg-light border-end border-primary border-4 text-dark' : ''}`}>
              <img style={{ width: '20px' }} src={assets.add_icon} alt='' />
              <span className="d-none d-md-inline">Add Doctor</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/doctor-list'} className={({ isActive }) => `nav-link d-flex align-items-center gap-3 py-3 px-4 text-secondary ${isActive ? 'bg-light border-end border-primary border-4 text-dark' : ''}`}>
              <img style={{ width: '20px' }} src={assets.people_icon} alt='' />
              <span className="d-none d-md-inline">Doctors List</span>
            </NavLink>
          </li>
        </ul>
      )}

      {role === 'doctor' && (
        <ul className="nav flex-column mt-3">
          <li className="nav-item">
            <NavLink to={'/doctor-dashboard'} className={({ isActive }) => `nav-link d-flex align-items-center gap-3 py-3 px-4 text-secondary ${isActive ? 'bg-light border-end border-primary border-4 text-dark' : ''}`}>
              <img style={{ width: '20px' }} src={assets.home_icon} alt='' />
              <span className="d-none d-md-inline">Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/doctor-appointments'} className={({ isActive }) => `nav-link d-flex align-items-center gap-3 py-3 px-4 text-secondary ${isActive ? 'bg-light border-end border-primary border-4 text-dark' : ''}`}>
              <img style={{ width: '20px' }} src={assets.appointment_icon} alt='' />
              <span className="d-none d-md-inline">Appointments</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/doctor-profile'} className={({ isActive }) => `nav-link d-flex align-items-center gap-3 py-3 px-4 text-secondary ${isActive ? 'bg-light border-end border-primary border-4 text-dark' : ''}`}>
              <img style={{ width: '20px' }} src={assets.people_icon} alt='' />
              <span className="d-none d-md-inline">Profile</span>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Sidebar