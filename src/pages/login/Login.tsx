import { useState } from "react";
import { MdClose } from "react-icons/md";
import { getUserDetail } from "../../api/userApi";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import { authActions } from "../../redux/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import { slugs } from "../../constant";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useAuthStore from "@/redux/authenticationSlice";
import { login } from "@/api/authApi";
// import { loginStatus } from "@/redux/authSlice";

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const {loginSuccess,accessToken}:any = useAuthStore.getState();
  console.log(accessToken);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginCredential = {
      email: email,
      password: password,
    };

    await login(JSON.stringify(loginCredential))
      .then((res) => {
        if (res.status === 200) {
          Cookies.set("access_token", res.data.access_token, {
            expires: 1 / 24,
            secure: true,
          });

          Cookies.set("refresh_token", res.data.refresh_token, {
            expires: 7,
            secure: true,
          });
          console.log(res.data);

          const user = jwtDecode(res.data.access_token).sub;

          loginSuccess(res.data.access_token, res.data.refresh_token, user);

          // dispatch(
          //   authActions.loginSuccess({
          //     user: user && user,
          //     access_token: res.data.access_token,
          //     refresh_token: res.data.refresh_token,
          //   })
          // );

          navigate("/");
        }
      })
      .catch((error: any) => {
        toast.error(error.response.data ? "Inavlid credential" : "Error");
      });
  };

  return (
    <div className="modal-wrapper text-white bg-slate-700 ">
      <div className=" modal-box w-[400px]">
        <div className="mb-5 shadow-md sticky top-0 bg-inherit p-4  border-inherit">
          <span className="close absolute top-4 right-2 cursor-pointer">
            <MdClose size={25} />
          </span>
          <h1 className=" text-2xl font-extrabold">Login</h1>
        </div>
        <form onSubmit={handleLoginSubmit} className="grid gap-2  p-4">
          <div className="grid gap-1 ">
            <label htmlFor="" className="form-label">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-input"
              required
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-input"
              required
            />
          </div>
          <div>
            <button type="submit" className="submit-btn w-full">
              Login
            </button>
            <span>
              Don't have an account ?{" "}
              <h2 onClick={() => navigate(`${slugs.SIGNUP}`)}>Register Now</h2>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
