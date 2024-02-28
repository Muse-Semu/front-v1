import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./redux/authenticationSlice";
import Loading from "./components/loading/Loading";
interface Props {
  authenticated: boolean;
}

const {  isAuthenticated }: any = useAuthStore.getState();

const ProtectedRoute = () => {
  return <> <Outlet/></>
};

export default ProtectedRoute;
