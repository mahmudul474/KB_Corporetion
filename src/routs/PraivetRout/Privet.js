import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthProbaider/AuthProvider';
import LoadingSpiner from "../../Shared/LoadingSpiner/LoadingSpiner";

const Private = ({ children }) => {
  const { currentUser, loading, user } = useContext(AuthContext);

  const location = useLocation();
  if (loading) {
    return <LoadingSpiner></LoadingSpiner>;
  }

  if (currentUser || user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default Private;