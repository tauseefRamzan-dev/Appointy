import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f8f9fa' }}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" size="large" className="rounded-pill px-4" onClick={() => navigate('/')}>
                        Back Home
                    </Button>
                }
            />
        </div>
    );
};

export default PageNotFound;