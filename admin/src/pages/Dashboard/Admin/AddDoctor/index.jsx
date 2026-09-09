// import React, { useState } from 'react';
// import { Form, Input, Select, Button, Row, Col, Typography, Upload } from 'antd';
// import { UploadOutlined, UserOutlined } from '@ant-design/icons';

// const { Option } = Select;

// const DoctorForm = () => {
//   const [form] = Form.useForm();
// const {Title,Paragraph}=Typography
// const [fileList, setFileList] = useState([]);


// const handleUploadChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   const beforeUpload = (file) => {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//     if (!isJpgOrPng) {
//       message.error('You can only upload JPG/PNG file!');
//     }
//     return isJpgOrPng || Upload.LIST_IGNORE;
//   };
//   const onFinish = (values) => {
//     console.log('Form Values:', values);
//   };

//   return (
//     <div 
//     // style={
//     //   { maxWidth: '900px', margin: '40px auto', padding: '24px', background: '#fff', borderRadius: '8px' }
//     //   }
//       >
//       <Title level={4}>Add Doctor</Title>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         requiredMark={false}
//       >
//         <Form.Item 
//         name="avatar" 
//         valuePropName="fileList"
//         getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
//         style={{ marginBottom: '32px' }}
//       >
//         <Upload
//           beforeUpload={beforeUpload}
//           fileList={fileList}
//           onChange={handleUploadChange}
//           maxCount={1}
//           accept="image/png, image/jpeg"
//           // showUploadList={false}
//         >
//           <div style={{ 
//             width: '60px', 
//             height: '60px', 
//             borderRadius: '50%', 
//             backgroundColor: '#f0f2f5', 
//             display: 'flex', 
//             alignItems: 'center', 
//             justifyContent: 'center',
//             fontSize: '24px',
//             color: '#bfbfbf',
//             cursor: 'pointer',
//             overflow: 'hidden'
//           }}>
//             {fileList.length > 0 && fileList[0].originFileObj ? (
//               <img 
//                 src={URL.createObjectURL(fileList[0].originFileObj)} 
//                 alt="avatar" 
//                 style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//               />
//             ) : (
//               <UserOutlined />
//             )}
//           </div>
//         </Upload>
//       </Form.Item>
        

//         <Row gutter={24}>
//           {/* Left Column */}
//           <Col xs={24} md={12}>
//             <Form.Item label="Your name" name="name" rules={[{ required: true, message:'Please input your name!' }]}>
//               <Input placeholder="Name" size="large" />
//             </Form.Item>

//             <Form.Item label="Doctor Email" name="email" rules={[{ required: true, type: 'email', message:'Please input a valid email!' }]}>
//               <Input placeholder="Email" size="large" />
//             </Form.Item>

//             <Form.Item label="Set Password" name="password" rules={[{ required: true, message:'Please input your password!' }]}>
//               <Input.Password placeholder="Password" size="large" />
//             </Form.Item>
//             <Form.Item label="Experience" name="experience" required>
//              <Select
//       initialValues="1-year"
//       className=' w-100'
//       showSearch
//       style={{ width: 120 }}
//       // onChange={handleChange}
//       options={[
//         { value: '1-year', label: '1 Year' },
//         { value: '2-year', label: '2 Years' },
//         { value: '3-year', label: '3 Years' },
//         { value: '4-year', label: '4 Years' },
//         { value: '5-year', label: '5 Years' },
//         { value: '6-year', label: '6 Years' },
//         { value: '7-year', label: '7 Years' },
//         { value: '8-year', label: '8 Years' },
//         { value: '9-year', label: '9 Years' },
//         { value: '10+year', label: '10+ Years' },
      
//       ]}
//     />
//             </Form.Item>

//             <Form.Item label="Fees" required name={"fee"}>
//               <Input type={"number"} placeholder='Doctor Fees'></Input>
//             </Form.Item>

//             <Form.Item label="About Doctor" name={"aboutDoctor"} required>
//               <Input.TextArea size='large' placeholder="Write about doctor"></Input.TextArea>
//             </Form.Item>
//           </Col>

//           <Col xs={24} md={12}>
//             <Form.Item label="Speciality" name="speciality">
//               <Select
//               size="large"
//       initialValues="General physician"
//       className=' w-100'
//       showSearch
//       style={{ width: 120 }}
//       // onChange={handleChange}
//    options={[
//       { value: 'General physician', label: 'General physician' },
//       { value: 'Gynecologist', label: 'Gynecologist' },
//       { value: 'Dermatologist', label: 'Dermatologist' },
//       { value: 'Pediatricians', label: 'Pediatricians' },
//       { value: 'Neurologist', label: 'Neurologist' },
//       { value: 'Gastroenterologist', label: 'Gastroenterologist' },
//     ]}
      

//     />
//             </Form.Item>

//             <Form.Item label="Degree" name="degree">
//               <Input placeholder="Degree" size="large" />
//             </Form.Item>

//             <Form.Item label="Address" name="address1" style={{ marginBottom: '12px' }}>
//               <Input placeholder="Address 1" size="large" />
//             </Form.Item>
            
//             <Form.Item name="address2">
//               <Input placeholder="Address 2" size="large" />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Form.Item style={{ marginTop: '24px' }}>
//           <Button type="primary" htmlType="submit" size="large" style={{ minWidth: '150px' }}>
//             Add doctor
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default DoctorForm;


import React, { useState } from 'react';
import { Form, Input, Select, Button, Row, Col, Typography, Upload} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';

const { Title } = Typography;

const DoctorForm = () => {
  const [isProcessing,setIsProcessing]=useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      toast.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng || Upload.LIST_IGNORE;
  };

  const onFinish = async (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (values[key] !== undefined && values[key] !== null) {
        formData.append(key, values[key]);
      }
    });
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('avatar', fileList[0].originFileObj);
    }

    try {
      const token=localStorage.getItem("token");
      setIsProcessing(true);
      const response = await axios.post(
        `${import.meta.env.VITE_apiURL}/admin/add-doctor`, 
        formData, 
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.data.success) {
        toast.success('Doctor added successfully!');
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      toast.error(error.response?.data?.message || 'Failed to add doctor.');
    }
    finally{
      setIsProcessing(false)
    }
  };

  return (
    <div>
      <Title level={4}>Add Doctor</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        initialValues={{
          experience: '1-year',
          speciality: 'General physician'
        }}
      >
        <Form.Item 
          name="avatar" 
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          style={{ marginBottom: '32px' }}
        >
          <Upload
            beforeUpload={beforeUpload}
            fileList={fileList}
            onChange={handleUploadChange}
            maxCount={1}
            accept="image/png, image/jpeg"
          >
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              backgroundColor: '#f0f2f5', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              color: '#bfbfbf',
              cursor: 'pointer',
              overflow: 'hidden'
            }}>
              {fileList.length > 0 && fileList[0].originFileObj ? (
                <img 
                  src={URL.createObjectURL(fileList[0].originFileObj)} 
                  alt="avatar" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <UserOutlined />
              )}
            </div>
          </Upload>
        </Form.Item>
        
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item label="Your name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input placeholder="Name" size="large" />
            </Form.Item>

            <Form.Item label="Doctor Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
              <Input placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item label="Set Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item label="Experience" name="experience" required>
              <Select
                className="w-100"
                showSearch
                style={{ width: '100%' }}
                options={[
                  { value: '1-year', label: '1 Year' },
                  { value: '2-year', label: '2 Years' },
                  { value: '3-year', label: '3 Years' },
                  { value: '4-year', label: '4 Years' },
                  { value: '5-year', label: '5 Years' },
                  { value: '6-year', label: '6 Years' },
                  { value: '7-year', label: '7 Years' },
                  { value: '8-year', label: '8 Years' },
                  { value: '9-year', label: '9 Years' },
                  { value: '10+year', label: '10+ Years' },
                ]}
              />
            </Form.Item>

            <Form.Item label="Fees" required name="fee">
              <Input type="number" placeholder="Doctor Fees" size="large" />
            </Form.Item>

            <Form.Item label="About Doctor" name="aboutDoctor" required>
              <Input.TextArea size="large" placeholder="Write about doctor" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Speciality" name="speciality">
              <Select
                size="large"
                className="w-100"
                showSearch
                style={{ width: '100%' }}
                options={[
                  { value: 'General physician', label: 'General physician' },
                  { value: 'Gynecologist', label: 'Gynecologist' },
                  { value: 'Dermatologist', label: 'Dermatologist' },
                  { value: 'Pediatricians', label: 'Pediatricians' },
                  { value: 'Neurologist', label: 'Neurologist' },
                  { value: 'Gastroenterologist', label: 'Gastroenterologist' },
                ]}
              />
            </Form.Item>

            <Form.Item label="Degree" name="degree">
              <Input placeholder="Degree" size="large" />
            </Form.Item>

            <Form.Item label="Address" name="address1" style={{ marginBottom: '12px' }}>
              <Input placeholder="Address 1" size="large" />
            </Form.Item>
            
            <Form.Item name="address2">
              <Input placeholder="Address 2" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: '24px' }}>
          <Button loading={isProcessing} type="primary" htmlType="submit" size="large" style={{ minWidth: '150px' }}>
            Add doctor
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DoctorForm;