import { useState } from "react";
import { MdClose } from "react-icons/md";
import { login } from "../../api/APIService";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../redux/authenticationSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginCredential = {
      username: email,
      password: password,
    };
    login(JSON.stringify(loginCredential)).then((res) => {
      if (res.data) {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        const user = jwtDecode(res.data.access_token);
        dispatch(
          authActions.loginSuccess({
            user: user,
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
          })
        );
      }
      navigate("/");
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
              Username
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
              Don't have an account ? <Link to={"/"}>Register Now</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
