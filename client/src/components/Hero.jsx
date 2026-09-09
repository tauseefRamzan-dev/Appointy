import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const { Title, Paragraph } = Typography;

const Hero = () => {
  const { group_profiles, header_img,arrow_icon } = assets;
  const navigate=useNavigate();

  return (
    <div
      className="rounded-3 px-5 pt-3 overflow-hidden"
      style={{ backgroundColor: '#5F6FFF', marginBottom: '38px' }}
    >
      <Row align="middle" gutter={[32, 32]}>
        <Col xs={24} md={12} lg={12}>
                   <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
          <Title
            className='text-white mb-3 fs-sm-0'
            level={1}
            style={{ color: '#ffffff',fontSize: 'clamp(1rem, 4vw, 3rem)', lineHeight: 1.2}}
          >
            Book Appointment <br /> With Trusted Doctors
          </Title>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
          <Row align="middle" gutter={[8, 8]} className="align-items-center">
            
            <Col xs={24} sm="auto" className="pe-0">
              <img
                src={group_profiles}
                alt="group-profiles"
                style={{ width: '100px', height: 'auto' }}
                loading="eager"
  fetchPriority="high"
              />
            </Col>
            <Col xs={24} sm flex="1" className="ps-2">
              <Paragraph className='text-white m-0'>
                Simply browse through our extensive list of trusted doctors,
                schedule your appointment hassle-free.
              </Paragraph>
            </Col>
          </Row>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
         <Button 
  className='btn-light text-secondary fw-semibold rounded-pill px-4 py-2 mt-4 d-inline-flex align-items-center gap-2'
  icon={<img src={arrow_icon} alt="arrow" style={{ width: '12px' }} />}
  iconPlacement="end" 
  size="large"
  onClick={()=>{
    const specialitySection = document.getElementById('speciality');
    if (specialitySection) {
      specialitySection.scrollIntoView({ behavior: 'smooth' });
    }
  }}
>
  Book appointment
</Button>
</motion.div>
        </Col>

        <Col
          xs={24}
          md={12}
          lg={12}
          className="d-flex justify-content-center align-items-end"
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >

          <img
            src={header_img}
            alt="Doctor Header"
            loading="eager"
            fetchPriority="high"
            style={{ width: '100%', maxHeight: '440px', objectFit: 'contain' }}
            />
            </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default Hero;

// import React from 'react';
// import { Typography, Row, Col, Button } from 'antd';
// import { assets } from '../assets/assets';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'motion/react';

// const { Title, Paragraph } = Typography;

// const Hero = () => {
//   const { group_profiles, header_img, arrow_icon } = assets;
//   const navigate = useNavigate();

//   return (
//     <div
//       className="rounded-3 px-5 pt-3 overflow-hidden"
//       style={{ backgroundColor: '#5F6FFF', marginBottom: '38px' }}
//     >
//       <Row align="middle" gutter={[32, 32]}>
//         {/* Left Content Animation */}
//         <Col xs={24} md={12} lg={12}>
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <Title
//               className='text-white mb-3 fs-sm-0'
//               level={1}
//               style={{ color: '#ffffff', fontSize: 'clamp(1rem, 4vw, 3rem)', lineHeight: 1.2 }}
//             >
//               Book Appointment <br /> With Trusted Doctors
//             </Title>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
//           >
//             <Row align="middle" gutter={[8, 8]} className="align-items-center">
//               <Col xs={24} sm="auto" className="pe-0">
//                 <img
//                   src={group_profiles}
//                   alt="group-profiles"
//                   style={{ width: '100px', height: 'auto' }}
//                   loading="eager"
//                   fetchPriority="high"
//                 />
//               </Col>
//               <Col xs={24} sm flex="1" className="ps-2">
//                 <Paragraph className='text-white m-0'>
//                   Simply browse through our extensive list of trusted doctors,
//                   schedule your appointment hassle-free.
//                 </Paragraph>
//               </Col>
//             </Row>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <Button 
//               className='btn-light text-secondary fw-semibold rounded-pill px-4 py-2 mt-4 d-inline-flex align-items-center gap-2'
//               icon={<img src={arrow_icon} alt="arrow" style={{ width: '12px' }} />}
//               iconPlacement="end" 
//               size="large"
//               onClick={() => {
//                 const specialitySection = document.getElementById('speciality');
//                 if (specialitySection) {
//                   specialitySection.scrollIntoView({ behavior: 'smooth' });
//                 }
//               }}
//             >
//               Book appointment
//             </Button>
//           </motion.div>
//         </Col>

//         {/* Right Image Spring Animation */}
//         <Col
//           xs={24}
//           md={12}
//           lg={12}
//           className="d-flex justify-content-center align-items-end"
//         >
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
//             style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
//           >
//             <img
//               src={header_img}
//               alt="Doctor Header"
//               loading="eager"
//               fetchPriority="high"
//               style={{ width: '100%', maxHeight: '440px', objectFit: 'contain' }}
//             />
//           </motion.div>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Hero;