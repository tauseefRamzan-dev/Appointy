import React, { useState } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Hero from '../../../components/Hero'
import { Typography,Row,Col } from 'antd'
import { assets} from '../../../assets/assets'
import TopDoctors from '../../../components/TopDoctors'
import SpecialityMenu from '../../../components/SpecialityMenu'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  const {Title,Paragraph}=Typography
  const {appointment_img}=assets

  const navigate=useNavigate();
  return (
    <>
    <Header/>
    
    <main className='container mb-4'>
          <Hero/>
<div id="speciality">
          <SpecialityMenu/>
        </div>

<TopDoctors/>





<div id='banner'>
      <div
            className="rounded-3 px-5 pt-2 overflow-hidden"
            style={{ backgroundColor: '#5F6FFF', marginBottom: '38px' }}
          >
            <Row align="middle" gutter={[32, 32]}>
              <Col xs={24} md={12} lg={12}>
              <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >

                <Title
                  className='text-white mb-3 fw-bolder'
                  level={1}
                  style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.3 }}
                  >
                  Book Appointment <br />With 100+ Trusted <br /> Doctors
                </Title>
                <button onClick={()=>{
                  navigate("/auth/register")
                }} className="btn btn-light">Create Account</button>
                </motion.div>
              </Col>
      
              <Col
                xs={24}
                md={12}
                lg={12}
                className="d-flex justify-content-center align-items-end"
              >
                <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >

                <img
                  src={appointment_img}
                  alt="Doctor Header"
                  style={{ width: '100%', maxHeight: '440px', objectFit: 'contain' }}
                  />
                  </motion.div>
                
              </Col>
            </Row>
          </div>
</div>


    </main>
    <Footer/>
    </>
  )
}

export default Home