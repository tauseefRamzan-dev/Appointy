import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'
import { Col, Row, Typography, Card, Button, Divider, Tag, Space } from 'antd'
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { user } = useAuth();
  const { Title, Text } = Typography;
  const [appointments, setAppointments] = useState([]);

  const getAppointments=async(uid)=>{
  const token=localStorage.getItem("token")
  await axios.get(`${import.meta.env.VITE_apiURL}/appointments/getAppointmentsByPatient/${uid}`,
    {
             headers: {
               // "Content-Type": "multipart/form-data",
               Authorization: `Bearer ${token}`,
             },
           }
  )
  .then(({status,data})=>{
    if(status===200)
    {
      const {appointments}=data
      console.log(data)
      setAppointments(appointments)
    }
  })
}

const cancelAppointment=async(_id)=>{
    const token=localStorage.getItem("token")
   await axios.patch(`${import.meta.env.VITE_apiURL}/appointments/appointment_cancel/${_id}`,{}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
   )
   .then(async({status,data})=>{
    if(status===200)
    {
        const {message}=data;
        toast.success(message);
      await  getAppointments(user?.uid)
    }
   }).catch((error)=>{
    console.log(error)
    toast.error(error?.response?.data?.message|| 'Something went wrong.')
   })

}
 

  useEffect(() => {
    if (user?.uid) {
      getAppointments(user.uid);
    }
  }, [user]);

  return (
    <>
      <Header />
      <main style={{ background: '#f8f9fa', minHeight: '80vh', padding: '40px 0' }}>
        <div className='container' style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <Title level={3} style={{ marginBottom: '4px' }}>My Appointments</Title>
            <Text type="secondary">Manage your upcoming and past medical consultations</Text>
          </div>
          
          <Divider dashed style={{ borderColor: '#d9d9d9' }} />
          
          <div id='my-appointments'>
            {appointments.length === 0 ? (
              <Card style={{ textAlign: 'center', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
                <Text type="secondary">No appointments found.</Text>
              </Card>
            ) : (
              appointments.map((item, index) => (
                <Card 
                  key={item._id || index} 
                  style={{ 
                    marginBottom: '20px', 
                    borderRadius: '12px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    border: '1px solid #f0f0f0'
                  }}
                  bodyStyle={{ padding: '24px' }}
                >
                  <Row gutter={[16, 16]} align="middle">
                    <Col lg={14} sm={24} xs={24}>
                      <Space direction="vertical" size={4}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <Title level={4} style={{ margin: 0 }}>{item?.docData?.name}</Title>
                          <Tag color="blue" style={{ borderRadius: '4px' }}>{item?.docData?.speciality || 'General'}</Tag>
                        </div>
                        
                        <Text type="secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <EnvironmentOutlined /> {item?.docData?.address}, {item?.docData?.address?.city || 'Cityville'}
                        </Text>
                        
                        <Text style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                          <CalendarOutlined style={{ color: '#1890ff' }} /> 
                          <span>Date & Time: <span style={{ color: '#8c8c8c' }}>{item.slotDate} | {item.slotTime}</span></span>
                        </Text>
                      </Space>
                    </Col>

                    <Col lg={10} sm={24} xs={24} style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>

                    {
                      (!item.isCompleted && !item.cancelled)?
                                            <>
                      <Button type="primary" ghost style={{ borderRadius: '6px', fontWeight: 500 }}>
                        Pay Online
                      </Button>
                      <Button onClick={()=>cancelAppointment(item._id)} danger style={{ borderRadius: '6px', fontWeight: 500 }}>
                        Cancel appointment
                      </Button>
                      </>
                      :
(item.isCompleted)?
<Tag color="green" style={{ padding: '6px 14px', fontSize: '14px', borderRadius: '6px' }}>
  Completed
</Tag>
:
<Tag color="red" style={{ padding: '6px 14px', fontSize: '14px', borderRadius: '6px' }}>
  Cancelled
</Tag>

                    }
                    </Col>
                  </Row>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyAppointments;