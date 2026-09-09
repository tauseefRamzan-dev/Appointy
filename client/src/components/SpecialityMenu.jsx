import React from 'react'
import { Row,Col,Typography } from 'antd'
import { motion } from 'framer-motion'
import { specialityData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
const SpecialityMenu = () => {
  const {Title}=Typography;

  const navigate=useNavigate();
  return (
    <div id='findBySpeciality' className='mt-4'>
<motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >

          <Row>
            <Col span={24} className='d-flex justify-content-center'>
            <Title level={3}>Find by Speciality
</Title>
            </Col>
            <Col span={24} className='d-flex justify-content-center text-center'>
            Simply browse through our extensive list of trusted doctors,<br/>      schedule your appointment hassle-free.
            </Col>
          </Row>
      </motion.div>

       
<div className='d-flex justify-content-center w-100'>

<Row className='flex-nowrap overflow-auto py-2' style={{ scrollbarWidth: 'none' }}>
        {specialityData.map((item, index) => (
          <Col key={index} style={{ flexShrink: 0 }} className='text-center mx-2'>
      <motion.div
  // initial={{ opacity: 0, scale: 0.8 }}
  // animate={{ opacity: 1, scale: 1 }}
  // whileHover={{ scale: 1.1, y: -5 }}
  // transition={{ duration: 0.3 }}
  initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.3}}
>      
<div onClick={(e) => {
    navigate(`/doctors/${item?.speciality}`); 
}}>
            <div className='p-3 d-flex align-items-center justify-content-center mx-auto mb-1 ' style={{ width: '90px', height: '90px' }}>
              <img src={item.image} alt={item.speciality} style={{ width: '64px' }} />
            </div>
            <p className='small fw-medium mb-0'>{item.speciality}</p>
</div>

            </motion.div>
          </Col>
        ))}
      </Row>
</div>
</div>

  )
}

export default SpecialityMenu