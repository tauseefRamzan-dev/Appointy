import React, { useEffect, useState } from 'react';
import { Button, Flex, Space, Spin, Table, Tag, Typography } from 'antd';
import axios from 'axios';
import { useApp } from '../../../../context/AppContext';
import { useAuth } from '../../../../context/AuthContext';
import { assets } from '../../../../assets/assets';
import { toast } from 'react-toastify';
import {calculateAge} from '../../../../global/global'
const { cancel_icon ,tick_icon} = assets;



const Appointments = () => {
  const { Title, Paragraph } = Typography;
  const { cancelAppointment,completeAppointment ,isLoading} = useApp();
  const {user}=useAuth();
  console.log(user)
  const [appointments,setAppointments]=useState([])
const getAppointments=async()=>{
  const token=localStorage.getItem("token")
  await axios.get(`${import.meta.env.VITE_apiURL}/appointments/getAppointmentsByDoctor/${user._id}`,
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
      console.log(appointments)
      setAppointments(appointments)
    }
  })
}
  useEffect(() => {
    // getAllAppointments();
    getAppointments();
  }, []);



const columns = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
    render: (_, __, index) => index + 1,
  },
  {
    title: 'Patient',
    dataIndex: ['userData', 'fullName'],
    key: 'patient',
    render: text => <a>{text || 'N/A'}</a>,
  },
  {
    title: 'Payment',
    dataIndex: ["payment"],
    key: 'payment',
    render: text => (
  <Tag color={text ? 'green' : 'blue'}>
    {text ? 'Online' : 'CASH'}
  </Tag>
),
  },
 {
  title: 'Age',
  dataIndex: ['userData', 'dob'],
  key: 'dob',
  render: (dob) => calculateAge(dob),
},
  {
    title: 'Date & Time',
    key: 'dateTime',
    render: (_, record) => `${record.slotDate} ${record.slotTime}`,
  },
  {
    title: 'Fees',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => `PKR ${amount}`,
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //    (!record.isCompleted && !record.cancelled)?
  //     <div 
  //       onClick={async() => {
  //         // TODO: Call your cancel appointment function here using record._id
  //         await cancelAppointment(record._id);
  //         await getAllAppointments();
  //       }}
  //       style={{ cursor: 'pointer', display: 'inline-block' }}
  //     >
  //       <img src={cancel_icon} alt="Cancel" />
  //     </div>
  //     :(record.isCompleted)? <Tag color={"green"}>Completed</Tag>: <Tag color={"red"}>Cancelled</Tag>
  //   ),
  // },

  {
  title: 'Action',
  key: 'action',
  render: (_, record) => (
    (!record.isCompleted && !record.cancelled) ? (
      <Space size="middle">
        <div 
          onClick={async () => {
            // TODO: Call your complete appointment function here
            await completeAppointment(record._id);
            await getAppointments();
          }}
          style={{ cursor: 'pointer', display: 'inline-block' }}
          title="Mark as Completed"
        >
          <img src={tick_icon} alt="Complete" style={{ width: '22px', height: '22px' }} />
        </div>
        <div 
          onClick={async () => {
            await cancelAppointment(record._id);
            await getAppointments()
          }}
          style={{ cursor: 'pointer', display: 'inline-block' }}
          title="Cancel Appointment"
        >
          <img src={cancel_icon} alt="Cancel" style={{ width: '22px', height: '22px' }} />
        </div>
      </Space>
    ) : record.isCompleted ? (
      <Tag color={"green"}>Completed</Tag>
    ) : (
      <Tag color={"red"}>Cancelled</Tag>
    )
  ),
}
];

 if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Title level={4}>All Appointments</Title>
      <Table columns={columns} dataSource={appointments} rowKey="_id" />
    </>
  );
};

export default Appointments;