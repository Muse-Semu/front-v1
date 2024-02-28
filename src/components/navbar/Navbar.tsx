import { useDispatch } from "react-redux";
import { Badge } from "../ui/badge";
import "./navbar.scss";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/api/authApi";
import useAuthStore from "@/redux/authenticationSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logoutSuccess,userData } = useAuthStore.getState();
  
  const navigate = useNavigate();
  const handleLogout = async () => {
    // dispatch(authActions.logoutSuccess())
    logoutSuccess();

    await logout().then((res) => {
      if (res.status === 200) {
        navigate("/login");
      }
    });
  };

  return (
    <div className="navbar sticky top-0 bg-inherit z-20 shadow-md mb-2">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>Yegna</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          {/* <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          /> */}
          <span></span>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Badge variant="secondary">{userData?.email}</Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
