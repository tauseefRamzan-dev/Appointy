import React from 'react';
import { Dropdown, Avatar } from 'antd';
import { DownOutlined, UserOutlined, CalendarOutlined, LogoutOutlined } from '@ant-design/icons';
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';



const ProfileDropdown = () => {
  const {upload_area}=assets
  const {handleLogout,user}=useAuth();
  const navigate=useNavigate();






const items = [
  {
    key: '1',
    label: 'My Profile',
    icon: <UserOutlined />,
    onClick: ()=>{
      navigate("/my-profile")
    }
  },
  {
    key: '2',
    label: 'My Appointments',
    icon: <CalendarOutlined />,
    onClick: ()=>{
      navigate("/my-appointments")
    }
  
    
  },
  {
    key: '3',
    label: 'Logout',
    icon: <LogoutOutlined />,
    danger: true,
    onClick: ()=>{
      handleLogout();
    }
  },
];

return(

  <div className="d-flex align-items-center gap-2">
      <Dropdown  menu={{ items }} trigger={['hover']}>
        <a onClick={(e) => e.preventDefault()} className="text-decoration-none d-flex align-items-center gap-2">
         <Avatar size={50} style={{objectFit: "contain"}}  src={user?.photo?.url || upload_area}  icon={<UserOutlined />} />
        <DownOutlined/>
          {/* <DownOutlined style={{ fontSize: '10px', color: '#7C7C7C' }} /> */}
        </a>
      </Dropdown>
    </div>
    )

  };

export default ProfileDropdown;