import React from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { Col, Row, Typography } from 'antd'
import { assets } from '../../../assets/assets'
import '../../../sass/about.scss'
const { Title, Paragraph } = Typography
import { motion } from 'framer-motion'
import { Helmet} from 'react-helmet-async';

const Contact = () => {
  const { contact_image } = assets

  return (
    <>
    <Helmet>
    <title>Contact Us | Appointy</title>
        <meta name="description" content="Contact to Appointy, your trusted healthcare partner." />
      </Helmet>
      <Header />
      <main className='container my-4'>
        <div id="contact-us">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

          <Title level={2} className='text-secondary text-center'>Contact <span className='fw-bold'>Us</span></Title>
          </motion.div>
          <Row gutter={[24, 16]} className="d-flex flex-row justify-content-center align-items-center">
            <Col lg={12} md={12} sm={24} xs={24}>
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >

              <img 
                src={contact_image} 
                alt="Contact Appointy" 
                style={{ width: '100%', maxHeight: '408px', objectFit: "contain" }} 
                />
                </motion.div>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <div className="d-flex flex-column">
                <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="d-flex flex-column"
              >

               <Title level={4} className='mt-sm-2 text-secondary'>OUR OFFICE</Title>
                
                <Paragraph  className='text-dark text-secondary'>
54709 Willms Station <br />
Suite 350, Washington, USA
                </Paragraph>
<Paragraph>Tel: (415) 555-0132 <br />
Email: customersupport@appointy.in</Paragraph>
                <Title level={4} className='text-secondary'>CAREERS AT APPOINTY</Title>

                <Paragraph className="text-dark text-secondary">
Tel: (415) 555-0132 <br />
Email: customersupport@appointy.in
                </Paragraph>
              </motion.div>
              </div>
            </Col>
          </Row>

        </div>
      </main>
      <Footer />
    </>
  )
}

export default Contact