import React, { useState } from 'react'
// import Header from '../../components/Header'
// import Footer from '../../components/Footer'
import { Button, Card, Col,Form,Input,Row, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../../../context/AuthContext'
const Login = () => {
  const {Title,Paragraph}=Typography;
const [state,setState]=useState("admin")
const [isProcessing,setIsProcessing]=useState(false)
  const navigate=useNavigate()
const [form] = Form.useForm();
const {readProfile}=useAuth();
 const handleSubmit = (values) => {
    const { email, password } = values;
    setIsProcessing(true);

    const endpoint = state === "admin" ? "/auth/admin/login" : "/auth/doctor/login";
    const dashboardRoute = state === "admin" ? "/dashboard-admin" : "/dashboard-doctor";

    axios.post(`${import.meta.env.VITE_apiURL}${endpoint}`, { email, password })
      .then(async ({ status, data }) => {
        if (status === 200 || data.success) {
          const { token, user,message} = data;
          
          localStorage.setItem("token", token);
          localStorage.setItem("role", state);
          
          // if (message) {
          //   toast.success(message);
          // }
          await readProfile(token, state);
          navigate(dashboardRoute);
        }
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || error.response?.data?.error || "Invalid credentials";
        toast.error(errorMsg);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <>
    {/* <Header/> */}
    <main className='container d-flex justify-content-center align-items-center'>
      <Row justify={"center"} className='w-100'>
        <Col xs={22} sm={16} md={12} lg={8} className='d-flex justify-content-center'>
        <Card className='h-auto  p-3 shadow-lg border-0 rounded-4'>
          <div className='text-center'>
            
          <Title     style={{ textAlign: "center" }}  level={3} className='text-muted'>
            {
              (state==="admin")?
              <span style={{color: "#5F6FFF"}}>Admin </span>
              :
              <span style={{color: "#5F6FFF"}}>Doctor </span>
            }
            
              Login</Title>
            </div>
          <Form layout="vertical" form={form} onFinish={handleSubmit} >
           <Row>
            <Col span={24}>
                <Form.Item label="Email" name={"email"} rules={[{ required: true, message: 'Please input your email' },{type: "email", message: "Please enter correct email address"}]}>
                        <Input type={"email"}/>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item label="Password" name={"password"} rules={[{ required: true, message: 'Please input your password'}]}>
                        <Input.Password />
                </Form.Item>
            </Col>
            <Col span={24} className='text-center'>
                    <Form.Item label={null}>
      <Button loading={isProcessing} block type="primary" htmlType="submit">Login</Button>
    </Form.Item>
            </Col>
            <Col span={24}>
  {state === "admin" ? (
    <Paragraph>
      Doctor Login?{" "}
      <span 
        style={{ color: "#1890ff", cursor: "pointer" }} 
        onClick={() => setState("doctor")}
      >
        Click here
      </span>
    </Paragraph>
  ) : (
    <Paragraph>
      Admin Login?{" "}
      <span 
        style={{ color: "#1890ff", cursor: "pointer" }} 
        onClick={() => setState("admin")}
      >
        Click here
      </span>
    </Paragraph>
  )}
</Col>
           
           </Row>
          </Form>
        </Card>
        </Col>
      </Row>
    </main>
    {/* <Footer/> */}
    </>
  )
}

export default Login