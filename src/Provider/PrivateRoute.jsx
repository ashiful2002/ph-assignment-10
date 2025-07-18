import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }
  if (user && user?.email) {
    return children;
  } else {
    return (
      <Navigate to="/signin" state={{ from: location }} replace></Navigate>
    );
  }
  
};

export default PrivateRoute;
