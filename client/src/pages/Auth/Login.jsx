import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Button, Card, Col,Form,Input,Row, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
const Login = () => {
  const {Title,Paragraph}=Typography;
  const [isProcessing,setIsProcessing]=useState(false)
  const {readProfile}=useAuth();
  const navigate=useNavigate()
const [form] = Form.useForm();

 const handleSubmit=(values)=>{
const {email,password}=values

setIsProcessing(true)
    axios.post(`${import.meta.env.VITE_apiURL}/auth/login`,{email,password})
    .then(({status,data})=>{
        if(status===200)
        {
          const {message,token}=data;
          // toast.success(message);
          localStorage.setItem("token",token)
          readProfile(token)
          navigate("/")
        }
    }).catch((error)=>{
        toast.error(error.response?.data?.message)
    }).finally(()=>{
      setIsProcessing(false)
    })
  }

  return (
    <>
    <Header/>
    <main className='mt-2 mb-5'>
      <Row justify={"center"}>
        <Col xs={22} sm={16} md={12} lg={8} className='d-flex justify-content-center'>
        <Card className='h-auto p-3 shadow-lg border-0 rounded-4'>
          <Title level={3} className='text-muted'>Login</Title>
          <Paragraph className='text-muted'>Please log in to book appointment</Paragraph>
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
            <Paragraph >Create an new account? <Link to={"/auth/register"}>Click here</Link></Paragraph>
            </Col>
           </Row>
          </Form>
        </Card>
        </Col>
      </Row>
    </main>
    <Footer/>
    </>
  )
}

export default Login