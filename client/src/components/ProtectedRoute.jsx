import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path according to your folder structure

const ProtectedRoute = ({ children }) => {
    const { isAuth } = useAuth();
    if (!isAuth) {
        return <Navigate to="/auth/login" replace />;
    }
    return children ? children : <Outlet />;
};
export default ProtectedRoute;