// import React, { useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { assets} from '../../../assets/assets';
// import Header from '../../../components/Header';
// import Footer from '../../../components/Footer';
// import { Button, Card, Col, Row, Spin, Typography } from 'antd';
// import { addDays, format, startOfToday } from "date-fns";
// import RelatedDoctors from '../../../components/RelatedDoctors';
// import { useApp } from '../../../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Appointment = () => {
//     const { Title, Paragraph } = Typography;
//     const {doctors}=useApp()
//     const { verified_icon, info_icon } = assets;
//     const { docID } = useParams();
//     const [isProcessing,setIsProcessing]=useState(false)

//     const [slotIndex, setSlotIndex] = useState(0);
//     const [slotTime, setSlotTime] = useState('');

//     const doctor = doctors.find((item) => {
//         return item._id === docID;
//     });

//     const today = startOfToday();
//     const nextSevenDays = [...Array(7)].map((_, index) => {
//         const date = addDays(today, index);
//         return {
//             dayName: format(date, "EEE"), 
//             dayNumber: format(date, "d"), 
//             fullDate: format(date, "yyyy-MM-dd") 
//         };
//     });

//     const timeSlots = [
//         "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
//         "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
//         "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
//         "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
//         "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
//         "8:00 PM", "8:30 PM"
//     ];
// // Inside your component or right before rendering timeSlots:
// const todaySlots = timeSlots.filter((item) => {
//     // If the user selected a future day (slotIndex > 0), show all slots
//     if (slotIndex !== 0) return true;

//     // If it's today, parse the slot string (e.g., "10:30 AM") into a Date object for today
//     const [time, modifier] = item.split(' ');
//     let [hours, minutes] = time.split(':');
    
//     if (modifier === 'PM' && hours !== '12') hours = parseInt(hours, 10) + 12;
//     if (modifier === 'AM' && hours === '12') hours = 0;

//     const slotDate = new Date();
//     slotDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
//     // Only keep slots that are in the future compared to right now
//     return slotDate > new Date();
// });

//      if (!doctor) {
//         return (
//             <>
//                <main className='container d-flex justify-content-center align-items-center' style={{ minHeight: '60vh' }}>
//     <Spin size="large" />
// </main>
//             </>
//         );
//     }


//     const handleSubmit=async()=>{
//         setIsProcessing(true)
//         const token=localStorage.getItem("token")
//         const appointmentData={
//           slotDate:nextSevenDays[slotIndex].fullDate,
//           slotTime,
//           docId: docID,
//         }
//        await axios.post(`${import.meta.env.VITE_apiURL}/appointments/book_appointment`,appointmentData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//        )
//        .then(({status,data})=>{
//          if(status===201)
//          {
//             const {message}=data;
//             toast.success(message);
//          }
//        }).catch((error)=>{
//         console.log("Error while booking appointment",error);
//         toast.error(error.response?.data?.message || 'Failed to book appointment.');
//        }).finally(()=>{
//         setIsProcessing(false)
//        })
//     }

//     return (
//         <>
//         <Header/>
//         <main className='container my-4'>
//             <Row gutter={[16, 16]}>
//                 <Col lg={8} md={8} sm={24} xs={24}>
//                     <div className='shadow-sm text-center mx-auto' style={{ height: "288px", width: "288px" }}>
//                         <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={doctor.image} alt={doctor.name} />
//                     </div>
//                 </Col>
//                 <Col lg={16} md={16} sm={24} xs={24}>
//                     <Card className='d-flex flex-column justify-content-center shadow border-0 h-100'>
//                         <Title className='text-secondary d-flex gap-2 align-items-center m-0' level={2}>
//                             {doctor.name}
//                             <img width={"25px"} height={"25px"} src={verified_icon} alt="verified" />
//                         </Title>

//                         <Paragraph className='d-flex gap-2 align-items-center mt-2 mb-3'>
//                             <span>{`${doctor.degree} - ${doctor.speciality}`}</span>
//                             <span className="text-secondary border py-0.5 px-2 rounded-pill text-xs">{doctor.experience}</span>
//                         </Paragraph>

//                         <div>
//                             <Title level={4} className='d-flex gap-2 align-items-center text-dark mb-1'>
//                                 About
//                                 <img height={"17px"} width={"17px"} src={info_icon} alt="info" />
//                             </Title>
//                             <Paragraph className='text-secondary'>{doctor.about}</Paragraph>
//                         </div>

//                         <Title className='text-secondary mt-2' level={4}>
//                             Appointment fee: PKR {doctor.fees}
//                         </Title>
//                     </Card>
//                 </Col>
//             </Row>

//             <div id='booking-slots' className='mt-5'>
//                 <Row justify={"center"}>
//                     <Col lg={12} md={16} sm={24} xs={24}>
//                         <Title className='text-secondary text-center text-md-start mb-3' level={4}>Booking slots</Title>
                        
//                         <div 
//                             id='date-day' 
//                             className='d-flex gap-3 pb-2 overflow-x-auto overflow-x-lg-hidden flex-nowrap justify-lg-content-center'
//                             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//                         >
//                             <style>{`
//                                 #date-day::-webkit-scrollbar { display: none; }
//                                 @media (min-width: 992px) {
//                                     #date-day { overflow-x: visible !important; }
//                                 }
//                             `}</style>
//                             {nextSevenDays.map((item, index) => (
//                                 <div 
//                                     onClick={() => setSlotIndex(index)}
//                                     key={index} 
//                                     className={`text-center py-3 px-4 rounded-pill border flex-shrink-0 flex-grow-1 ${slotIndex === index ? 'bg-primary text-white border-primary' : 'border-dark text-dark'}`}
//                                     style={{ cursor: 'pointer', minWidth: '4.5rem' }}
//                                 >
//                                     <p className="mb-0 fw-bold">{item.dayName}</p>
//                                     <p className="mb-0">{item.dayNumber}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </Col>
//                 </Row>

//                 <Row className='mt-4 justify-content-center'>
//                     <Col lg={12} md={16} sm={24} xs={24}>
//                         <div 
//                             id='time-slots'
//                             className='d-flex gap-3 overflow-x-auto pb-2 flex-nowrap'
//                             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//                         >
//                             <style>{`
//                                 #time-slots::-webkit-scrollbar { display: none; }
//                             `}</style>
//                             {todaySlots.map((item, index) => (
//                                 <div 
//                                     onClick={() => setSlotTime(item)}
//                                     key={index} 
//                                     className={`text-center py-2 px-3 rounded-pill border flex-shrink-0 ${item === slotTime ? 'bg-primary text-white border-primary' : 'border-dark text-secondary'}`}
//                                     style={{ cursor: 'pointer', minWidth: '5.5rem' }}
//                                 >
//                                     <p className="mb-0 text-sm">{item.toLowerCase()}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </Col>
//                 </Row>
//                 <Row className='mt-4 justify-content-center'>
//                     <Col lg={6} md={8} sm={12} xs={24} className='text-center'>
//                         <Button type="primary" onClick={()=>{
//                             handleSubmit();
//                         }} className=' rounded-pill w-100 py-4 fw-bold text-uppercase' loading={isProcessing}>
//                             Book an appointment
//                         </Button>
//                     </Col>
//                 </Row>
//             </div>

// <RelatedDoctors speciality={doctor.speciality} docID={docID}/>

//         </main>
//         <Footer/>
//         </>
//     )
// }

// export default Appointment;

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../../../assets/assets';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Button, Card, Col, Row, Spin, Typography } from 'antd';
import { addDays, format, startOfToday } from "date-fns";
import RelatedDoctors from '../../../components/RelatedDoctors';
import { useApp } from '../../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';

const Appointment = () => {
    const { Title, Paragraph } = Typography;
    const { doctors } = useApp();
    const {isAuth}=useAuth();
    const { verified_icon, info_icon } = assets;
    const { docID } = useParams();
    const [isProcessing, setIsProcessing] = useState(false);

    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const doctor = doctors.find((item) => item._id === docID);

    const today = startOfToday();
    const nextSevenDays = [...Array(7)].map((_, index) => {
        const date = addDays(today, index);
        return {
            dayName: format(date, "EEE"), 
            dayNumber: format(date, "d"), 
            fullDate: format(date, "yyyy-MM-dd") 
        };
    });

    const timeSlots = [
        "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
        "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
        "8:00 PM", "8:30 PM"
    ];

    const todaySlots = timeSlots.filter((item) => {
        if (slotIndex !== 0) return true;

        const [time, modifier] = item.split(' ');
        let [hours, minutes] = time.split(':');
        
        if (modifier === 'PM' && hours !== '12') hours = parseInt(hours, 10) + 12;
        if (modifier === 'AM' && hours === '12') hours = 0;

        const slotDate = new Date();
        slotDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        return slotDate > new Date();
    });

    if (!doctor) {
        return (
            <main className='container d-flex justify-content-center align-items-center' style={{ minHeight: '60vh' }}>
                <Spin size="large" />
            </main>
        );
    }
    const handleSubmit = async () => {
        if (!slotTime) {
            toast.error('Please select a time slot first.');
            return;
        }
        if(!isAuth){
            return toast.warn("Please log in to schedule your appointment.")
        }

        setIsProcessing(true);
        const token = localStorage.getItem("token");
        const appointmentData = {
            slotDate: nextSevenDays[slotIndex].fullDate,
            slotTime,
            docId: docID,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_apiURL}/appointments/book_appointment`,
                appointmentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const { data } = response;
            if (data.isError) {
                toast.error(data.message);
            } else {
                toast.success(data.message);
                setSlotTime('');
            }
        } catch (error) {
            console.log("Error while booking appointment", error);
            toast.error(error.response?.data?.message || 'Failed to book appointment.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <Header />
            <main className='container my-4'>
                <Row gutter={[16, 16]}>
                    <Col lg={8} md={8} sm={24} xs={24}>
                        <div className='shadow-sm text-center mx-auto' style={{ height: "288px", width: "288px" }}>
                            <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={doctor.image} alt={doctor.name} />
                        </div>
                    </Col>
                    <Col lg={16} md={16} sm={24} xs={24}>
                        <Card className='d-flex flex-column justify-content-center shadow border-0 h-100'>
                            <Title className='text-secondary d-flex gap-2 align-items-center m-0' level={2}>
                                {doctor.name}
                                <img width={"25px"} height={"25px"} src={verified_icon} alt="verified" />
                            </Title>

                            <Paragraph className='d-flex gap-2 align-items-center mt-2 mb-3'>
                                <span>{`${doctor.degree} - ${doctor.speciality}`}</span>
                                <span className="text-secondary border py-0.5 px-2 rounded-pill text-xs">{doctor.experience}</span>
                            </Paragraph>

                            <div>
                                <Title level={4} className='d-flex gap-2 align-items-center text-dark mb-1'>
                                    About
                                    <img height={"17px"} width={"17px"} src={info_icon} alt="info" />
                                </Title>
                                <Paragraph className='text-secondary'>{doctor.about}</Paragraph>
                            </div>

                            <Title className='text-secondary mt-2' level={4}>
                                Appointment fee: PKR {doctor.fees}
                            </Title>
                        </Card>
                    </Col>
                </Row>

                <div id='booking-slots' className='mt-5'>
                    <Row justify={"center"}>
                        <Col lg={12} md={16} sm={24} xs={24}>
                            <Title className='text-secondary text-center text-md-start mb-3' level={4}>Booking slots</Title>
                            
                            <div 
                                id='date-day' 
                                className='d-flex gap-3 pb-2 overflow-x-auto overflow-x-lg-hidden flex-nowrap justify-lg-content-center'
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <style>{`
                                    #date-day::-webkit-scrollbar { display: none; }
                                    @media (min-width: 992px) {
                                        #date-day { overflow-x: visible !important; }
                                    }
                                `}</style>
                                {nextSevenDays.map((item, index) => (
                                    <div 
                                        onClick={() => {
                                            setSlotIndex(index);
                                            setSlotTime('');
                                            setSlotTime('');
                                        }}
                                        key={index} 
                                        className={`text-center py-3 px-4 rounded-pill border flex-shrink-0 flex-grow-1 ${slotIndex === index ? 'bg-primary text-white border-primary' : 'border-dark text-dark'}`}
                                        style={{ cursor: 'pointer', minWidth: '4.5rem' }}
                                    >
                                        <p className="mb-0 fw-bold">{item.dayName}</p>
                                        <p className="mb-0">{item.dayNumber}</p>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>

                    <Row className='mt-4 justify-content-center'>
                        <Col lg={12} md={16} sm={24} xs={24}>
                            <div 
                                id='time-slots'
                                className='d-flex gap-3 overflow-x-auto pb-2 flex-nowrap'
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <style>{`
                                    #time-slots::-webkit-scrollbar { display: none; }
                                `}</style>
                                {todaySlots.map((item, index) => (
                                    <div 
                                        onClick={() => setSlotTime(item)}
                                        key={index} 
                                        className={`text-center py-2 px-3 rounded-pill border flex-shrink-0 ${item === slotTime ? 'bg-primary text-white border-primary' : 'border-dark text-secondary'}`}
                                        style={{ cursor: 'pointer', minWidth: '5.5rem' }}
                                    >
                                        <p className="mb-0 text-sm">{item.toLowerCase()}</p>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-4 justify-content-center'>
                        <Col lg={6} md={8} sm={12} xs={24} className='text-center'>
                            <Button 
                                type="primary" 
                                onClick={handleSubmit} 
                                className='rounded-pill w-100 py-4 fw-bold text-uppercase' 
                                loading={isProcessing}
                            >
                                Book an appointment
                            </Button>
                        </Col>
                    </Row>
                </div>

                <RelatedDoctors speciality={doctor.speciality} docID={docID} />
            </main>
            <Footer />
        </>
    );
};

export default Appointment;