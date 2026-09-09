// import React, { useEffect } from 'react';
// import { Button, Flex, Space, Table, Tag, Typography } from 'antd';
// import axios from 'axios';
// import { useApp } from '../../../../context/AppContext';
// import {assets} from '../../../../assets/assets'
// // const columns = [
// //   {
// //     title: "#",
// //     dataIndex: "#",
// //     key: "#",
// //   },
// //   {
// //     title: 'Patient',
// //     dataIndex: 'Patient',
// //     key: 'Patient',
// //     render: text => <a>{text}</a>,
// //   },
// //   {
// //     title: 'Age',
// //     dataIndex: 'age',
// //     key: 'age',
// //   },
// //   {
// //     title: 'Date & Time',
// //     dataIndex: 'Date & Time',
// //     key: 'Date & Time',
// //   },
// //   {
// //     title: 'Doctor',
// //     dataIndex: 'Doctor',
// //     key: 'Doctor',
// //   },
// //   {
// //     title: 'Fees',
// //     dataIndex: 'Fees',
// //     key: 'Fees',
// //   },
// //   {
// //     title: 'Doctor',
// //     dataIndex: 'Doctor',
// //     key: 'Doctor',
// //   },
// //   {
// //     title: 'Action',
// //     key: 'action',
// //     render: (_, record) => (
// //       <Space size="medium">
// //         <a>Invite {record.name}</a>
// //         <a>Delete</a>
// //       </Space>
// //     ),
// //   },
// // ];

// const {cancel_icon}=assets;

// const columns = [
//   {
//     title: "#",
//     dataIndex: "index",
//     key: "index",
//     render: (_, __, index) => index + 1,
//   },
//   {
//     title: 'Patient',
//     dataIndex: ['userData', 'fullName'],
//     key: 'patient',
//     render: text => <a>{text || 'N/A'}</a>,
//   },
//   {
//     title: 'DOB',
//     dataIndex: ['userData', 'dob'],
//     key: 'dob',
//   },
//   {
//     title: 'Date & Time',
//     key: 'dateTime',
//     render: (_, record) => `${record.slotDate} ${record.slotTime}`,
//   },
//   {
//     title: 'Doctor',
//     dataIndex: ['docData', 'name'],
//     key: 'doctor',
//   },
//   {
//     title: 'Fees',
//     dataIndex: 'amount',
//     key: 'amount',
//     render: (amount) => `PKR ${amount}`,
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Button icon={cancel_icon} type='danger'></Button>
//     ),
//   },
// ];

// const data1 = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['kawaii'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];
// const Appointments =() => {
// const {Title,Paragraph}=Typography

// const {appointments,getAllAppointments}=useApp();

// useEffect(() => {
//         getAllAppointments();
//     }, []);
//     console.log(appointments)
//   return (
//     <>
// <Title level={4}>All Appointments
// </Title>
// <Table columns={columns} dataSource={appointments} />
//     </>
//   )

// }
// export default Appointments;

import React, { useEffect } from 'react';
import { Button, Flex, Space, Spin, Table, Tag, Typography } from 'antd';
import axios from 'axios';
import { useApp } from '../../../../context/AppContext';
import { assets } from '../../../../assets/assets';
import { toast } from 'react-toastify';
import {calculateAge} from '../../../../global/global'
const { cancel_icon } = assets;



const Appointments = () => {
  const { Title, Paragraph } = Typography;
  const { appointments, getAllAppointments,cancelAppointment ,isLoading} = useApp();

  useEffect(() => {
    getAllAppointments();
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
  title: 'Age',
  dataIndex: ['userData', 'dob'],
  key: 'dob',
  render: (dob) => calculateAge(dob) || "N/A",
},
  {
    title: 'Date & Time',
    key: 'dateTime',
    render: (_, record) => `${record.slotDate} ${record.slotTime}`,
  },
  {
    title: 'Doctor',
    dataIndex: ['docData', 'name'],
    key: 'doctor',
  },
  {
    title: 'Fees',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => `PKR ${amount}`,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
     (!record.isCompleted && !record.cancelled)?
      <div 
        onClick={async() => {
          // TODO: Call your cancel appointment function here using record._id
          await cancelAppointment(record._id);
          await getAllAppointments();
        }}
        style={{ cursor: 'pointer', display: 'inline-block' }}
      >
        <img src={cancel_icon} alt="Cancel" />
      </div>
      :(record.isCompleted)? <Tag color={"green"}>Completed</Tag>: <Tag color={"red"}>Cancelled</Tag>
    ),
  },
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