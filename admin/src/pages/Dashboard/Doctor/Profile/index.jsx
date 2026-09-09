import React, { useState } from 'react';
import { Descriptions, Form, Input, Button, Space, Card, Checkbox, InputNumber, Tag } from 'antd';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, readProfile } = useAuth(); 

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (values) => {
    const formData = new FormData();
    formData.append('about', values.about);
    formData.append('fees', values.fees);
    formData.append('available', values.available);    
    formData.append('address', `${values.line1 || ''}, ${values.line2 || ''}`);
    
    handleSubmit(formData);
  };

  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      setIsProcessing(true);
      
      const response = await axios.post(
        `${import.meta.env.VITE_apiURL}/doctor/update-profile/${user._id}`, 
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
        const role=localStorage.getItem("role")
        await readProfile(token,role);
      }
    } catch (error) {
      console.error('Error while updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsProcessing(false);
    }
  };

  
  if (!user) return null;

  return (
    <main >
      <Card title={user.fullName} style={{ maxWidth: 600, width: '100%', margin: '20px auto' }}>
        {!isEditing ? (
          <>
            <div className='fs-4' style={{ fontWeight: 'bolder', marginBottom: 12, color: '#1890ff' }}>
              {user.name}
            </div>
            <Descriptions 
  column={{ xs: 1, sm: 1, md: 2 }} 
  bordered 
  size="small" 
  style={{ marginBottom: 24 }}
>
  <Descriptions.Item label="Email" span={2}>{user.email}</Descriptions.Item>
  <Descriptions.Item label="Degree">{user.degree}</Descriptions.Item>
  <Descriptions.Item label="Speciality">{user.speciality}</Descriptions.Item>
  <Descriptions.Item label="Appointment Fee">{user.fees}</Descriptions.Item>
  <Descriptions.Item label="Availability">
    <Tag color={user.available ? 'green' : 'red'}>
      {user.available ? '✔ Available' : '❌ Not Available'}
    </Tag>
  </Descriptions.Item>
  <Descriptions.Item label="About" span={2}>{user.about}</Descriptions.Item>
  <Descriptions.Item label="Address" span={2}>
    {user.address}
  </Descriptions.Item>
</Descriptions>
            <Button type="primary" shape="round" onClick={handleEditClick}>
              Edit
            </Button>
          </>
        ) : (
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              email: user?.email,
              about: user?.about,
              fees: user?.fees,
             line1: user?.address ? user.address.split(',')[0]?.trim() : '',
    line2: user?.address ? user.address.split(',')[1]?.trim() : '',
              available: user?.available ?? false,
            }}
            onFinish={handleSave}
          >
            <Form.Item label="Email id" name="email">
              <Input disabled />
            </Form.Item>
            <Form.Item label="About" name="about" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Appointment Fee" name="fees" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Address Line 1" name="line1">
              <Input />
            </Form.Item>
            <Form.Item label="Address Line 2" name="line2">
              <Input />
            </Form.Item>
            <Form.Item name="available" valuePropName="checked">
              <Checkbox>Available</Checkbox>
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
  );
};

export default Profile;