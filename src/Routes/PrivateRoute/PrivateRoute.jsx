import React, { Children } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();

    if(loading){
        return <span class="loading loading-spinner text-info"></span>

    }
    if(!user){
        <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children ;
};

export default PrivateRoute;