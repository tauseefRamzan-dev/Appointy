import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Button, Card, Col,Form,Input,Row, Typography,message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const Register = () => {
  const {Title,Paragraph}=Typography;
const [isProcessing,setIsProcessing]=useState(false)
const navigate=useNavigate();
  const [form]=Form.useForm()
  const handleSubmit=(values)=>{
const {fullName,email,password}=values

setIsProcessing(true)
    axios.post(`${import.meta.env.VITE_apiURL}/auth/register`,{fullName,email,password})
    .then(({status,data})=>{
        if(status===201)
        {
          const {message}=data;
          toast.success(message,{autoClose: 3000});
          navigate("/auth/login");

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
        <Card className='w-auto h-auto p-3 shadow-lg border-0 rounded-4'>
          <Title level={3} className='text-muted'>Create Account</Title>
          <Paragraph className='text-muted'>Please sign up to book appointment</Paragraph>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
           <Row>
            <Col span={24} >
                <Form.Item  label="Full Name" name={"fullName"} rules={[{ required: true, message: 'Please input your name!' },{min: 3, message:"Please enter your correct name!"}]}>
                        <Input type={"text"}/>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item label="Email" name={"email"} rules={[{ required: true, message: 'Please input your email' },{type: "email", message: "Please enter correct email address"}]}>
                        <Input type={"email"}/>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item  hasFeedback label="Password" name={"password"} rules={[{ required: true, message: 'Please input your password'},{min: 8, message: "Password must be at least 8 character" }]}>
                        <Input.Password />
                </Form.Item>
            </Col>
            <Col span={24} className='text-center'>
                    <Form.Item label={null}>
      <Button loading={isProcessing} block type="primary" htmlType="submit">Register</Button>
    </Form.Item>
            </Col>
             <Col span={24}>
            <Paragraph >Already have an account? <Link to={"/auth/login"}>Login here</Link></Paragraph>
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

export default Register