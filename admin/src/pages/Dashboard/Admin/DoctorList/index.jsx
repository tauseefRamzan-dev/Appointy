import React, { useEffect } from 'react' 
import { Card, Checkbox, Col, Row, Spin, Typography } from 'antd'
import { useApp } from '../../../../context/AppContext'
import axios from 'axios'

const DoctorList = () => {
  const { Title, Paragraph } = Typography
  const { doctors, setDoctors, getDoctors, isLoading } = useApp()


  const handleSubmit=async(_id)=> 
    {
    try {
      console.log(_id)
      await axios.post(`${import.meta.env.VITE_apiURL}/doctor/availbilityUpdate/${_id}`)
      .then(({status,data})=>{
        if(status===200)
        {
          setDoctors(prevDoctors => 
        prevDoctors.map(doc => 
          doc._id === _id ? { ...doc, available: !doc.available } : doc
        )
      )
        }
      })
    }catch(error)
     {
      console.error("Error updating availability:", error)
    }
  }

  if(isLoading)
     {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <>
      <Title level={4}>All Doctors</Title>
      <div>
        <Row gutter={[16, 16]}>
          {doctors?.map((item, index) => (
            <Col key={item._id || index} lg={6} md={12} sm={24} xs={24}>
              <Card style={{backgroundColor: "#F8F9FD",boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <Title level={5}>{item.name}</Title>
                <Paragraph>{item.speciality}</Paragraph>
                <Checkbox 
                  checked={item.available}
                  onChange={() => handleSubmit(item._id)}
                >
                  Available
                </Checkbox>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}

export default DoctorList