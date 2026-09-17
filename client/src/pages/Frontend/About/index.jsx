import React from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { Col, Row, Typography } from 'antd'
import { assets } from '../../../assets/assets'
import '../../../sass/about.scss'
const { Title, Paragraph } = Typography
import { motion } from 'framer-motion'
import { createRoot } from 'react-dom/client';
import { Helmet} from 'react-helmet-async';
const About = () => {
  const { about_image } = assets

  return (
    <>
    <Helmet>
        <title>About Us | Appointy</title>
        <meta name="description" content="Learn more about Appointy, your trusted healthcare partner." />
      </Helmet>
      <Header />
      <main className='container my-4'>
        <div id="about-us">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          <Title level={2} className='text-secondary text-center'>About <span className='fw-bold'>Us</span></Title>
          </motion.div>
          <Row gutter={[24, 16]} className="d-flex flex-row justify-content-center align-items-center">
            <Col lg={8} md={12} sm={24} xs={24}>
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
              <img 
                src={about_image} 
                alt="About Appointy" 
                style={{ width: '100%', maxHeight: '408px', objectFit: 'cover' }} 
                />
                </motion.div>
            </Col>
            <Col lg={16} md={12} sm={24} xs={24}>
              <div className="d-flex flex-column">
                <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="d-flex flex-column"
              >

                <Paragraph className='text-dark'>
                  Welcome to Appointy, your trusted partner in managing your healthcare needs conveniently and efficiently. At Appointy, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
                </Paragraph>
                
                <Paragraph className='text-dark'>
                  Appointy is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Appointy is here to support you every step of the way.
                </Paragraph>

                <Title level={4}>Our Vision</Title>

                <Paragraph className="text-dark">
                  Our vision at Appointy is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                </Paragraph>
              </motion.div>
              </div>
            </Col>
          </Row>
<div id='choose-us' className='mt-4'>
  <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >

          <Title level={4} >WHY <span className='fw-bold text-secondary'>CHOOSE US</span></Title>
            </motion.div>
<Row className='d-flex flex-row justify-content-center align-items-center'>

  <Col lg={8} md={8} sm={24} xs={24} >
  <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ y: -5 }}
                >

  <div className="custom-hover-box shadow p-5 text-dark" >
    <Title level={5}>EFFICIENCY:</Title>
    <Paragraph>Streamlined appointment scheduling that fits into your busy lifestyle.

</Paragraph>
</div>
                </motion.div>
  </Col>
  <Col lg={8} md={8} sm={24} xs={24}>
  <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                >

  <div className="custom-hover-box shadow p-5 text-dark">
<Title level={5}>CONVENIENCE:</Title>
<Paragraph>Access to a network of trusted healthcare professionals in your area.

</Paragraph>
</div>
                </motion.div>
  </Col>
  <Col lg={8} md={8} sm={24} xs={24}>
  <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ y: -5 }}
                >

  <div className="custom-hover-box shadow p-5 text-dark">
<Title level={5}>PERSONALIZATION:
</Title>
<Paragraph>Tailored recommendations and reminders to help you stay on top of your health.

</Paragraph>
</div>
                </motion.div>
  </Col>
</Row>




</div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default About