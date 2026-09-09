import React from 'react'
import { Button, Space } from 'antd'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useLocation,useNavigate } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
import ProfileDropDown from "../../components/ProfileDropDown"
import {useAuth} from '../../context/AuthContext'
const Navbar = () => {
  const {isAuth}=useAuth();
  console.log(isAuth)
  const {logo,menu_icon}=assets;
    // const getNavLinkClass = ({ isActive }) => 
    // `nav-link fw-bold ${isActive ? 'border-bottom border-2 border-primary fw-bolder  m-0' : ''}`
    const getNavLinkClass = ({ isActive }) => 
  `nav-link fw-bold d-inline-block ${isActive ? 'border-bottom border-2 border-primary fw-bolder m-0' : ''}`
    const location=useLocation();
    const navigate=useNavigate()
  return (
    <div className='container mt-0'>
      <nav className="navbar navbar-expand-lg border-bottom border-0 ">
        <div className="container-fluid">
          <NavLink to="/">
            <img  loading="eager"
  fetchPriority="high" width={112} height={112} src={logo} className="navbar-brand" alt="Logo" />
          </NavLink>

          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
  <i ><img src={menu_icon} alt="menu-toggle" /></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/">HOME</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/doctors">All DOCTORS</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/about">ABOUT</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/contact">CONTACT</NavLink>
              </li>
            </ul>

            <div>
              <Space>
                {
                 (location.pathname=="/")? 
                 <button
                onClick={() => {
      window.open("https://appointy-admin-panel.vercel.app/", "_blank");
    }}
                 className='btn btn-sm btn-primary rounded-4 fw-bold'>Admin Panel</button>
                 :""
                }
                {
                  (isAuth)?   <ProfileDropDown/>  :
                  <Button onClick={()=>{
                  navigate("/auth/register")
                }} size="large" className='rounded-4 fw-bolder' type='primary'>Create Account</Button>
                }
              </Space>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar