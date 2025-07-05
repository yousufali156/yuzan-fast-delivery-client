import React, { Children } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <span class="loading loading-spinner text-info"></span>

    }
    if (!user) {
        return <Navigate state={{ from: location.pathname }} to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;