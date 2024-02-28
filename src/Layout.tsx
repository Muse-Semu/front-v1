import { useEffect } from "react";
import useAuthStore, {
  accountData,
  accountStatus,
} from "./redux/authenticationSlice";
import Navbar from "./components/navbar/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading";
import Menu from "./components/menu/Menu";
import { generateToken } from "./api/authApi";
import { getUserDetail } from "./api/userApi";
import { Navigate } from "react-router-dom";

const Layout = () => {
  const {
    isAuthenticated,
    accessToken,
    refreshToken,
    user,
    userData,
    refreshTokenSuccess,
    account,
  } = useAuthStore.getState();

 

 

  return (
    <>
       
       {isAuthenticated? <div className="main">
          <Navbar user={userData} />

          <div className="grid grid-cols-7 xl:grid-cols-7 lg:grid-cols-6 gap-2 mt-5">
            <div className="ml-2 col-span-1 top-5 mt-5 h-screen">
              <Menu />
            </div>

            <div className="col-span-6 xl:col-span-6 lg:col-span-5 mx-2 border rounded">
              <>
                <ProtectedRoute/>
              </>
            </div>
          </div>
          <Footer />
        </div>:<Navigate to="/login" replace={true}/>}
      
    </>
  );
};

export default Layout;
