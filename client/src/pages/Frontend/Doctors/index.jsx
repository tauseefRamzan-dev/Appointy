import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { Col, Row, Card, Typography, Button, Drawer } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../../../context/AppContext'
import { Helmet} from 'react-helmet-async';

const Doctors = () => {
  const { Title, Paragraph,Text } = Typography;
  const {doctors}=useApp();
  const [doctorsShow, setDoctorsShow] = useState(doctors);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { speciality } = useParams();
  const navigate = useNavigate();
  
const categories=["General physician","Gynecologist","Dermatologist","Pediatricians","Neurologist","Gastroenterologist"]

  const handleCategoryClick=(itemSpeciality) => {
    setOpenDrawer(false);
    if (speciality===itemSpeciality) 
      {
      navigate('/doctors');
    }else 
      {
      navigate(`/doctors/${itemSpeciality}`);
    }
  };

  const RenderCategories=()=>(
    <div className='d-flex flex-column gap-2'>
      <Button
        type={!speciality ? "primary" : "default"}
        block
        onClick={()=>{
          setOpenDrawer(false);
          navigate('/doctors');
        }}
      >
        All Doctors
      </Button>

      {categories.map((item, index) => {
        const isActive = speciality === item;
        return (
          <Button 
            key={index} 
            type={isActive ? "primary" : "default"}
            block
            onClick={()=> handleCategoryClick(item)}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );

  useEffect(()=> 
    {
    if (speciality) 
      {
      const filtered = doctors.filter(doc => 
        doc.speciality.toLowerCase().trim() === decodeURIComponent(speciality).toLowerCase().trim()
      );
      setDoctorsShow(filtered);
    }else
       {
      setDoctorsShow(doctors);
    }
  }, [speciality,doctors]);

  return (
    <>
     <Helmet>
        <title>Doctors | Appointy</title>
            <meta name="description" content="Appointy Doctors, your trusted healthcare partner." />
          </Helmet>
      <Header />
        <Title level={5}  className='container'>Browse through the doctors specialist.
</Title>
      <main className='container my-4'>
        <div className='d-block d-lg-none mb-3'>
          <Button 
            type="primary" 
            icon={<FilterOutlined />} 
            onClick={() => setOpenDrawer(true)}
            block
          >
            Filter Categories {speciality ? `(${decodeURIComponent(speciality)})` : ''}
          </Button>
        </div>

        <Drawer
          title="Select Specialty"
          placement="left"
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
          className='d-lg-none'
        >
          <RenderCategories />
        </Drawer>

        <Row gutter={[16, 16]}>
          <Col lg={6} className='d-none d-lg-block'>
            <RenderCategories />
          </Col>

          <Col xs={24} lg={18}>
            <Row gutter={[16, 16]}>
              {doctorsShow.length > 0 ? (
                doctorsShow.map((item) => (
                  <Col key={item._id} lg={6} md={12} sm={12} xs={12}>
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
                        onClick={() => navigate(`/appointment/${item._id}`)}
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
              ) : (
                <Col span={24} className="text-center py-5">
                  <Paragraph type="secondary">No doctors found matching this specialty.</Paragraph>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </main>

      <div className='mt-5'>
      <Footer/>
      </div>
    </>
  )
}

export default Doctors