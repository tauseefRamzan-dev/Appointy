// import React, { useState } from 'react';
// import { Descriptions, Form, Input, Select, DatePicker, Button, Space, Card,Upload} from 'antd';
// import dayjs from 'dayjs';
// import {useAuth} from '../../../context/AuthContext'
// import { UserOutlined } from '@ant-design/icons';
// import { assets } from '../../../assets/assets';
// const MyProfile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [form] = Form.useForm();
// const [isProcessing,setIsProcessing]=useState(false)
//   const {user}=useAuth();
// const {upload_area}=assets
//   // Initial user data state
//   const [userData, setUserData] = useState({
//     email: 'example@gmail.com',
//     phone: '000000000',
//     address: '',
//     gender: 'Not Selected',
//     birthday: null,
//   });

//   // Edit button click hone par form mein current values set karke edit mode on karna
//   const handleEditClick = () => {
//     form.setFieldsValue({
//       ...userData,
//       birthday: userData.birthday ? dayjs(userData.birthday) : null,
//     });
//     setIsEditing(true);
//   };

//   // Save information button click hone par data update karna
//   const handleSave = (values) => {
//     setUserData({
//       ...values,
//       birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null,
//     });
//     setIsEditing(false);


    
//   };

//   const [fileList, setFileList] = useState([]);

//   const handleUploadChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   const beforeUpload = (file) => {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//     if (!isJpgOrPng) {
//       toast.error('You can only upload JPG/PNG file!');
//     }
//     return isJpgOrPng || Upload.LIST_IGNORE;
//   };


// const onFinish = async (values) => {
//     const formData = new FormData();

//     Object.keys(values).forEach((key) => {
//       if (values[key] !== undefined && values[key] !== null) {
//         formData.append(key, values[key]);
//       }
//     });
//     if (fileList.length > 0 && fileList[0].originFileObj) {
//       formData.append('avatar', fileList[0].originFileObj);
//     }

//     try {
//       const token=localStorage.getItem("token");
//       setIsProcessing(true);
//       const response = await axios.post(
//         `${import.meta.env.VITE_apiURL}/admin/add-doctor`, 
//         formData, 
//         {
//           headers: {
//             // "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 201 || response.data.success) {
//         toast.success('Profile updated successfully!');
//         form.resetFields();
//         setFileList([]);
//       }
//     } catch (error) {
//       console.error('Error while updating profile:', error);
//       toast.error(error.response?.data?.message || 'Failed to update profile.');
//     }
//     finally{
//       setIsProcessing(false)
//     }
//   };

//   return (
//     <main className='container'>

//     <Card title="Testing" style={{ maxWidth: 600, width: '100%', margin: '20px auto' }}>
//       {!isEditing ? (
//         // View Mode: Descriptions Component
//         <>
//          <div style={{ 
//               width: '60px', 
//               height: '60px', 
//               borderRadius: '50%', 
//               backgroundColor: '#f0f2f5', 
//               display: 'flex', 
//               alignItems: 'center', 
//               justifyContent: 'center',
//               fontSize: '24px',
//               color: '#bfbfbf',
//               cursor: 'pointer',
//               overflow: 'hidden'
//             }}
//             className='mb-3'>
//               <img 
//                   src={upload_area} 
//                   alt="avatar" 
//                   style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//                 />
//             </div>
//           <div style={{ fontWeight: 'bold', marginBottom: 12, color: '#1890ff' }}>
//             CONTACT INFORMATION
//           </div>
//           <Descriptions column={1} bordered size="small" style={{ marginBottom: 24 }}>
//             <Descriptions.Item label="Email id">{user.email}</Descriptions.Item>
//             <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
//             <Descriptions.Item label="Address">{user.address || '-'}</Descriptions.Item>
//           </Descriptions>

//           <div style={{ fontWeight: 'bold', marginBottom: 12, color: '#1890ff' }}>
//             BASIC INFORMATION
//           </div>
//           <Descriptions column={1} bordered size="small" style={{ marginBottom: 24 }}>
//             <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
//             <Descriptions.Item label="Birthday">
//               {user.dob ? user.dob : 'Not Selected'}
//             </Descriptions.Item>
//           </Descriptions>

//           <Button type="primary" shape="round" onClick={handleEditClick}>
//             Edit
//           </Button>
//         </>
//       ) : (
//         // Edit Mode: Form Component
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSave}
//         >
//         <Form.Item 
//           name="avatar" 
//           valuePropName="fileList"
//           getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
//           style={{ marginBottom: '32px' }}
//         >
//           <Upload
//             beforeUpload={beforeUpload}
//             fileList={fileList}
//             onChange={handleUploadChange}
//             maxCount={1}
//             accept="image/png, image/jpeg"
//           >
//             <div style={{ 
//               width: '60px', 
//               height: '60px', 
//               borderRadius: '50%', 
//               backgroundColor: '#f0f2f5', 
//               display: 'flex', 
//               alignItems: 'center', 
//               justifyContent: 'center',
//               fontSize: '24px',
//               color: '#bfbfbf',
//               cursor: 'pointer',
//               overflow: 'hidden'
//             }}>
//               {fileList.length > 0 && fileList[0].originFileObj ? (
//                 <img 
//                   src={URL.createObjectURL(fileList[0].originFileObj)} 
//                   alt="avatar" 
//                   style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//                 />
//               ) : (
//                 <img 
//                   src={upload_area} 
//                   alt="avatar" 
//                   style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//                 />
//               )}
//             </div>
//           </Upload>
//         </Form.Item>
//           <div style={{ fontWeight: 'bold', marginBottom: 12, color: '#1890ff' }}>
//             CONTACT INFORMATION
//           </div>
//           <Form.Item label="Email id" name="email" rules={[{ required: true, type: 'email' }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item label="Address" name="address">
//             <Input />
//           </Form.Item>

//           <div style={{ fontWeight: 'bold', marginBottom: 12, color: '#1890ff' }}>
//             BASIC INFORMATION
//           </div>
//           <Form.Item label="Gender" name="gender">
//             <Select
//               options={[
//                 { value: 'Not Selected', label: 'Not Selected' },
//                 { value: 'Male', label: 'Male' },
//                 { value: 'Female', label: 'Female' },
//                 { value: 'Other', label: 'Other' },
//               ]}
//             />
//           </Form.Item>
//           <Form.Item label="Birthday" name="birthday">
//             <DatePicker style={{ width: '100%' }} />
//           </Form.Item>

//           <Form.Item>
//             <Space>
//               <Button type="primary" shape="round" htmlType="submit">
//                 Save information
//               </Button>
//               <Button shape="round" onClick={() => setIsEditing(false)}>
//                 Cancel
//               </Button>
//             </Space>
//           </Form.Item>
//         </Form>
//       )}
//     </Card>
//     </main>
//   );
// };

// export default MyProfile;


import React, { useState } from 'react';
import { Descriptions, Form, Input, Select, DatePicker, Button, Space, Card, Upload } from 'antd';
import dayjs from 'dayjs';
import { useAuth } from '../../../context/AuthContext';
import { assets } from '../../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
const MyProfile =()=> {
  const [isEditing, setIsEditing]=useState(false);
  const [form]=Form.useForm();
  const [isProcessing, setIsProcessing]=useState(false);
  const { user,readProfile }=useAuth(); 
  const { upload_area }=assets;

  const [fileList, setFileList]=useState([]);
  const formData =new FormData();

  const handleEditClick=()=>
     {
    form.setFieldsValue({
      email: user?.email,
      phone: user?.phone,
      line1: user?.address?.line1 || '',
      line2: user?.address?.line2 || '',
      gender: user?.gender || 'Not Selected',
      birthday: user?.dob && user?.dob !== 'Not Selected' ? dayjs(user.dob) : null,
    });
    setIsEditing(true);
  };

  const handleUploadChange= ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload =(file)=> {
    const isJpgOrPng =file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) 
      {
      toast.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng || Upload.LIST_IGNORE;
  };


  const handleSave=async(values)=>
     {
    formData.append('phone', values.phone);
    formData.append('gender', values.gender);
    formData.append('dob', values.birthday ? values.birthday.format('YYYY-MM-DD') : 'Not Selected');
    
    formData.append('address', JSON.stringify({ line1: values.line1, line2: values.line2 }));

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('avatar', fileList[0].originFileObj);
    }

    handleSubmit();
  };
  const handleSubmit=async()=>{
    try {
      const token = localStorage.getItem("token");
      setIsProcessing(true);
      
      const response = await axios.post(
        `${import.meta.env.VITE_apiURL}/user/update-profile/${user._id}`, 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.data.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
       await  readProfile();
      }
    }catch (error) {
      console.error('Error while updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    }finally {
      setIsProcessing(false);
    }
  }

  if(!user) return null;

  return (
    <>
    <Header/>
    <main className='container'>
      <Card title={user.fullName || "My Profile"} style={{ maxWidth: 600, width: '100%', margin: '20px auto' }}>
        {!isEditing ? (
          // View Mode
          <>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              backgroundColor: '#f0f2f5', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              color: '#bfbfbf',
              overflow: 'hidden'
            }}
            className='mb-3'>
              <img 
                src={user.photo?.url || upload_area} 
                alt="avatar" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            <div style={{ fontWeight: 'bold', marginBottom: 12, color: '#1890ff' }}>
              CONTACT INFORMATION
            </div>
            <Descriptions column={1} bordered size="small" style={{ marginBottom: 24 }}>
              <Descriptions.Item label="Email id">{user.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
              <Descriptions.Item label="Address">
                {user.address?.line1 || user.address?.line2 
                  ? `${user.address.line1} ${user.address.line2}` 
                  : '-'}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ fontWeight: 'bold', marginBottom: 12, color: '#1890ff' }}>
              BASIC INFORMATION
            </div>
            <Descriptions column={1} bordered size="small" style={{ marginBottom: 24 }}>
              <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
              <Descriptions.Item label="Birthday">
                {user.dob && user.dob !== 'Not Selected' ? user.dob : 'Not Selected'}
              </Descriptions.Item>
            </Descriptions>

            <Button type="primary" shape="round" onClick={handleEditClick}>
              Edit
            </Button>
          </>
        ) : (
          // Edit Mode Form
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
          >
            <Form.Item style={{ marginBottom: '32px' }}>
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
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={fileList.length > 0 && fileList[0].originFileObj 
                      ? URL.createObjectURL(fileList[0].originFileObj) 
                      : (user.photo?.url || upload_area)} 
                    alt="avatar" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
              </Upload>
            </Form.Item>

            <div style={{ fontWeight: 'bold', marginBottom: 12, color: '#1890ff' }}>
              CONTACT INFORMATION
            </div>
            <Form.Item label="Email id" name="email">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Address Line 1" name="line1">
              <Input />
            </Form.Item>
            <Form.Item label="Address Line 2" name="line2">
              <Input />
            </Form.Item>

            <div style={{ fontWeight: 'bold', marginBottom: 12, color: '#1890ff' }}>
              BASIC INFORMATION
            </div>
            <Form.Item label="Gender" name="gender">
              <Select
                options={[
                  { value: 'Not Selected', label: 'Not Selected' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                  { value: 'Other', label: 'Other' },
                ]}
              />
            </Form.Item>
            <Form.Item label="Birthday" name="birthday">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" shape="round" htmlType="submit" loading={isProcessing}>
                  Save information
                </Button>
                <Button shape="round" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Card>
    </main>
    <Footer/>
    </>
  );
};

export default MyProfile;