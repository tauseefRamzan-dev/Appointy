import React from 'react'
import { Typography } from 'antd'
const Copyright = () => {
    const {Paragraph}=Typography;
    const now=new Date();
  return (
    <Paragraph className='text-center text-muted mt-4 pt-3 border-top'>&copy; {now.getFullYear()} Appointy — All Rights Reserved.</Paragraph>
  )
}

export default Copyright