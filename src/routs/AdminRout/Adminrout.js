import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProbaider/AuthProvider";
import LoadingSpiner from "../../Shared/LoadingSpiner/LoadingSpiner";
import useAdmin from "../../Hooks/useAdmin";

const Adminrout = ({ children }) => {
  const { currentUser, loading, user } = useContext(AuthContext);

  const [isAdmin, isAdminLoading] = useAdmin(currentUser?.email);

  const location = useLocation();
  if (loading || isAdminLoading) {
    return <LoadingSpiner></LoadingSpiner>;
  }

  if (currentUser && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default Adminrout;
