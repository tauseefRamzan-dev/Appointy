import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { assets } from "../../../assets/assets";
import Routes from "./Routes"
import { useNavigate, Link, useLocation } from "react-router-dom";
import '../../../sass/dashboardSidebar.scss';
import {useAuth} from '../../../context/AuthContext'
const { Header, Content, Sider } = Layout;
const { home_icon, appointment_icon, people_icon, admin_logo,add_icon
 } = assets;
 
 const AdminDashboard = () => {
   const navigate = useNavigate();
   const {handleLogout}=useAuth();
   const location = useLocation();
   const {
     token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    
    const items1 = [
      {
        key: "logo",
        label: <img width={160} src={admin_logo} alt="Logo" />,
        style: {pointerEvents: "none"}
     },
     {
       key: "role",
       label: <span className="text-secondary border py-2 px-2 rounded-pill text-xs">Admin</span>,
       style: {pointerEvents: "none"}
     },
     {
       key: "user-panel",
       label: <button className="btn btn-primary btn-sm py-1 px-3 rounded-pill text-xs">User Panel</button>,
     },
     {
       key: "logout",
       label: <button className="btn btn-danger btn-sm p-1 px-3 px-2 rounded-pill text-xs">Logout</button>,
       style: { marginLeft: 'auto' },
       onClick: handleLogout
     },
   ];
  const items2 = [
    {
      key: "/dashboard-admin",
      icon: <img src={home_icon} alt="Dashboard" className="sidebar-icon" />,
      label: "Dashboard",
    },
    {
      key: "/dashboard-admin/appointments",
      icon: (
        <img src={appointment_icon} alt="Appointments" className="sidebar-icon" />
      ),
      label: "Appointments",
    },
    {
      key: "/dashboard-admin/add-doctor",
      icon: <img src={add_icon} alt="Dashboard" className="sidebar-icon" />,
      label: "Add Doctor",
    },
    {
      key: "/dashboard-admin/doctor-list",
      icon: <img src={people_icon} alt="Profile" className="sidebar-icon" />,
      label: "Doctor List",
    },
  ];

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          padding: "0 16px",
        }}
      >
        <Menu
        selectable={false}
          theme="light"
          mode="horizontal"
          items={items1}
          style={{ flex: 1, minWidth: 0, borderBottom: "none" }}
        />
      </Header>

      <Layout>
        <Sider
          width={300}
          breakpoint="lg"
          collapsedWidth="80" 
          style={{ background: colorBgContainer }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            className="sidebar-menu"
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: "100%", borderInlineEnd: 0,marginTop:"35px" }}
            items={items2}
            onClick={handleMenuClick}
          />
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: '24px 0 0 0',
              minHeight: 280,
              background: "#F8F9FD",
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;