import React, { useState } from 'react'
import { Skeleton,Row,Col,Card, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {useApp} from '../context/AppContext'
const TopDoctors = () => {
    const {Title,Paragraph}=Typography
    const {doctors,isLoading}=useApp();
    const navigate=useNavigate()
  return (
    <>
    <div id='topDoctors'>
  <Row className='d-flex flex-column justify-content-center align-items-center mt-5'>
    
    <Title level={3} className='text-center'>
      Top  Doctors to Book
    </Title>
    <Paragraph className='text-center'>
      Simply browse through our extensive list of trusted <br /> doctors.
    </Paragraph>

  </Row>
</div>
    <div id='doctors-card' className='my-4'>
  <Row gutter={[16, 24]}>
    {isLoading
              ? 
                     Array.from({ length: 10 }).map((_, index) => (
                            <Col key={index} lg={6} md={12} sm={12} xs={12}>
                                <Card className='border-0 shadow-sm' bodyStyle={{ padding: '12px' }}>
                                    <Skeleton.Node active style={{ width: '100%', height: '220px' }} className='mb-3 rounded w-100' />
                                    
                                    <div className='d-flex align-items-center gap-2 mb-2'>
                                        <Skeleton.Avatar active size="small" shape="circle" style={{ width: '8px', height: '8px', minWidth: '8px' }} />
                                        <Skeleton.Input active size="small" style={{ width: '70px', height: '14px', minWidth: '70px' }} />
                                    </div>

                                    <Skeleton 
                                        active 
                                        paragraph={{ rows: 1, width: ['60%'] }} 
                                        title={{ width: '80%' }} 
                                    />
                                </Card>
                            </Col>
                        ))
                :
                doctors.slice(0,10).map((item, index) => (
                    <Col key={index} lg={6} md={12} sm={12} xs={12}>
       <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  whileHover={{ scale: 1.1, y: -5 }}
  transition={{ duration: 0.3 }}
>
        <Card
          hoverable
          className='overflow-hidden border-0 shadow-sm'
          bodyStyle={{ padding: '12px' }}
          onClick={()=>{
            navigate(`appointment/${item._id}`)
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

                  {item.available ? (
                            <>
                              <span 
                                className='rounded-circle bg-success d-inline-block' 
                                style={{ width: '8px', height: '8px' }}
                              ></span>
                              <small className='text-success fw-semibold'>Available</small>
                            </>
                          ) : (
                            <>
                              <span 
                                className='rounded-circle bg-secondary d-inline-block' 
                                style={{ width: '8px', height: '8px' }}
                              ></span>
                              <small className='text-secondary fw-semibold'>Unavailable</small>
                            </>
                          )}
          </div>
          <Title level={5} className='mb-1' style={{ fontSize: '15px' }}>{item.name}</Title>
          <Paragraph type='secondary' className='mb-0' style={{ fontSize: '13px' }}>{item.speciality}</Paragraph>
        </Card>
      </motion.div>
      </Col>
    
))

}
  
  </Row>
  <Row >
    <Col span={24} className='text-center'>
    <Link to={"/doctors"}  className='btn btn-secondary rounded py-1 px-4 mt-4 fw-bold'>More</Link>
    </Col>
  </Row>
</div>

</>
  )
}

export default TopDoctors