import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthProbaider/AuthProvider';
 
 
const Private = ({children}) => {
    const {currentUser,loading}=useContext(AuthContext)
    const location=useLocation()

     if(loading){
        return <h1>loading ....</h1>
     }


if(currentUser){
    return children
}


    return  <Navigate to="/login" state={{ from: location }} replace />;
};

export default Private;