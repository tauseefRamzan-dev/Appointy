import React, { useEffect, useState } from 'react'
import {Row, Col, Typography, Card, Table, Avatar, Tag,Space } from 'antd'
import axios from 'axios'
import { toast } from 'react-toastify'
import {assets} from '../../../../assets/assets'
import { motion } from 'framer-motion'
import {UserOutlined} from '@ant-design/icons'
import dayjs from 'dayjs';
import {useApp} from '../../../../context/AppContext'
const Home = () => {
const [dashData,setDashData]=useState({});
  const {earning_icon,patients_icon,appointments_icon,list_icon,upload_area,tick_icon,cancel_icon}=assets
const {Title,Paragraph,Text}=Typography;
  const { cancelAppointment,completeAppointment ,isLoading} = useApp();

  const getDashData=async()=>{
    const token=localStorage.getItem("token")
    await axios.get(`${import.meta.env.VITE_apiURL}/doctor/dashboard`,
     {
             headers: {
               Authorization: `Bearer ${token}`,
             },
           }
    ).then(({status,data})=>{
      if(status===200)
      {
        const {dashData}=data;
        console.log(dashData)
        setDashData(dashData)
      }
    }).catch((error)=>{
      toast.error(error.response.data.message)
    })
  }
  useEffect(()=>{
    getDashData();
  },[])
  return (
    <>
    
    <div>Home</div>
<div id='stats'>
  <Row gutter={[16, 16]}>
    <Col lg={8} md={8} sm={24} xs={24}>
       <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      transition={{ duration: 0.3 }}
    >

      <div className='bg-white d-flex align-items-center p-3 rounded border'>
        <img src={earning_icon} alt="Earnings" style={{ width: '45px', marginRight: '15px' }} />
        <div>
          <Title level={5} style={{ margin: 0, fontSize: "20px" }}>{dashData?.earnings || 0}</Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>Earnings</Text>
        </div>
      </div>
    </motion.div>
    </Col>

    <Col lg={8} md={8} sm={24} xs={24}>
       <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      transition={{ duration: 0.3 }}
    >

      <div className='bg-white d-flex align-items-center p-3 rounded border'>
        <img src={appointments_icon} alt="Appointments" style={{ width: '45px', marginRight: '15px' }} />
        <div>
          <Title level={5} style={{ margin: 0, fontSize: "20px" }}>{dashData?.appointments || 0}</Title>
          <Text type="secondary" style={{ fontSize: '16px', textWrap: "nowrap" }}>Appointments</Text>
        </div>
      </div>
    </motion.div>
    </Col>

    <Col lg={8} md={8} sm={24} xs={24}>
       <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      transition={{ duration: 0.3 }}
    >

      <div className='bg-white d-flex align-items-center p-3 rounded border'>
        <img src={patients_icon} alt="Patients" style={{ width: '45px', marginRight: '15px' }} />
        <div>
          <Title level={5} style={{ margin: 0, fontSize: "20px" }}>{dashData?.patients || 0}</Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>Patients</Text>
        </div>
      </div>
    </motion.div>
    </Col>
  </Row>
</div>


<div className='latest-bookings mt-4'>
          <Row>
<Col lg={18} md={24} sm={24} xs={24}>
      <Card title={
  <div className="d-flex align-items-center">
    <img className="me-2" src={list_icon} alt="List Icon" style={{ width: '20px', height: '20px' }} />
    <Title level={4} className="mb-0">Latest Bookings</Title>
  </div>
}>
<Row>
  <Col span={24}>
  {
    (dashData?.latestAppointments?.length === 0) ?
      <Title level={5}>No Latest Appointments</Title>
    :
      (dashData?.latestAppointments || []).map((item, index) => {
        return (
          
            <div key={index} className='d-flex justify-content-between align-items-center mb-3 border-bottom pb-2 w-100 flex-wrap gap-2'>
                <div className='d-flex'>
                  <Avatar size={50} style={{objectFit: "contain", marginRight: "8px"}}  src={item.userData?.photo.url || upload_area}  icon={<UserOutlined />} />
                   <div className='d-flex flex-column'>
                    <Title className='mb-0' level={5}>{item.userData.fullName}</Title>
                    <Text>{`Booking on ${dayjs(item.slotDate).format("D MMM YYYY")}`}</Text>
                   </div>
                </div>
                <div>
                  {
                    (!item.isCompleted && !item.cancelled) ? (
      <Space size="middle">
        <div 
          onClick={async () => {
            // TODO: Call your complete appointment function here
            await completeAppointment(item._id);
            await getDashData();
          }}
          style={{ cursor: 'pointer', display: 'inline-block' }}
          title="Mark as Completed"
        >
          <img src={tick_icon} alt="Complete" style={{ width: '44px', height: '44px' }} />
        </div>
        <div 
          onClick={async () => {
            await cancelAppointment(item._id);
            await getDashData();
          }}
          style={{ cursor: 'pointer', display: 'inline-block' }}
          title="Cancel Appointment"
        >
          <img src={cancel_icon} alt="Cancel" style={{ width: '44px', height: '44px' }} />
        </div>
      </Space>
    ) : item.isCompleted ? (
      <Tag color={"green"}>Completed</Tag>
    ) : (
      <Tag color={"red"}>Cancelled</Tag>
    )

                  }
                </div>
            </div>
        )
      })
  }
</Col>
  </Row>

  
</Card>
</Col>
          </Row>
    


</div>
    </>
  )
}

export default Home