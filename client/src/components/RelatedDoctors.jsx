import React from 'react'
import { Row,Col,Card, Typography } from 'antd'
// import { doctors } from '../assets/assets'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {useApp} from '../context/AppContext'
const RelatedDoctors = ({speciality,docID}) => {
    const {Title,Paragraph}=Typography
    const {doctors}=useApp();
const navigate=useNavigate()
const filteredDoctors=doctors.filter((item)=>{
   return item.speciality===speciality && item._id!==docID
})
  return (

    <div id='RelatedDoctors' className='mt-5'>
        <div className='text-center'>
    <Title level={3}>Related Doctors</Title>
<Paragraph className='text-secondary fw-bold'>Simply browse through our extensive list of trusted doctors.

</Paragraph>
        </div>

    <Row gutter={[16, 16]} className='d-flex flex-row'>

    {
(filteredDoctors.length>0)?


        filteredDoctors.map((item, index) => (
            <Col key={index} lg={6} md={12} sm={12} xs={12}>
                <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
            <Card
              hoverable
              className='overflow-hidden border-0 shadow-sm'
              bodyStyle={{ padding: '12px' }}
              onClick={()=>{
                navigate(`/appointment/${item._id}`)
              }}
            >
              <div 
                className='d-flex justify-content-center align-items-center mb-3 rounded'
                style={{ backgroundColor: "#EAEFFF", height: "220px" }}
                >
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover", 
                      objectPosition: "top" 
                    }}
                    />
              </div>
              <div className='d-flex align-items-center gap-2 mb-2'>
                <span 
                  className='rounded-circle bg-success d-inline-block' 
                  style={{ width: '8px', height: '8px' }}
                  ></span>
                <small className='text-success fw-semibold'>Available</small>
              </div>
              <Title level={5} className='mb-1' style={{ fontSize: '15px' }}>{item.name}</Title>
              <Paragraph type='secondary' className='mb-0' style={{ fontSize: '13px' }}>{item.speciality}</Paragraph>
            </Card>
            </motion.div>
          </Col>
        
    ))
    :
     (
                    <Col span={24} className="text-center py-5">
                      <Paragraph type="secondary">No other related doctors found in this specialty.</Paragraph>
                    </Col>
                  )
}
    </Row>
    
    
    
    </div>
  )
}

export default RelatedDoctors