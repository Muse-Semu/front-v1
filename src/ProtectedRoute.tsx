import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
interface Props{
    authenticated:boolean
}
const ProtectedRoute = (props:Props) => {
  if (!props.authenticated) {
    return <Navigate to="/login" replace={true} />;
  } else {
    return <Outlet />;
  }
}

export default ProtectedRoute
