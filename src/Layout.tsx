import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  accountData,
  accountStatus,
  getUser,
} from "./redux/authenticationSlice";
import Navbar from "./components/navbar/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading";
import Menu from "./components/menu/Menu";
import { authenticated } from "./redux/authSlice";
import { get } from "http";
import { getUserDetail } from "./api/APIService";
import { log } from "console";

const Layout = () => {
  const currentUser = useSelector((state: any) => state.authentication.user);
  const authenticated = useSelector(
    (state: any) => state.authentication.isAuthenticated
  );
  const dispatch = useDispatch();

  const [user, setUser] = useState();

  const status = useSelector(accountStatus);
  var account = useSelector(accountData);

  const access_token = useSelector(
    (state: any) => state.authentication.accessToken
  );
  const refresh_token = useSelector(
    (state: any) => state.authentication.refreshToken
  );

  useEffect(() => {
    if (currentUser && !account) {
      dispatch(getUser());
    }
  }, [currentUser]);

  return (
    <>
      <div className="main ">
        <Navbar user={account} />

        <div className="grid grid-cols-7 xl:grid-cols-7 lg:grid-cols-6 gap-2 mt-5  ">
          <div className="ml-2  col-span-1 top-5 mt-5 h-screen ">
            <Menu />
          </div>

          <div className="col-span-6 xl:col-span-6 lg:col-span-5 mx-2 border rounded   ">
            <ProtectedRoute authenticated={authenticated} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
