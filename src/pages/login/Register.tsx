import { useState } from "react";
import { MdClose } from "react-icons/md";
//import { register } from "../../api/APIService"; // Make sure to import your registration API function
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      toast.error("password do not match!");
      return;
    }

    try {
      const registrationData = {
        email: username,
        password: password,
        role: "USER",
        enabled:false
      };

      const res = await register(JSON.stringify(registrationData));
      console.log(res.data);
      if (res.status === 200) {
        toast.success("You have registered successfully!");
        navigate("/login");
      } else {
        toast.error(res?.data?.error);
      }

      // You may handle successful registration, e.g., redirecting the user or displaying a success message
    } catch (error) {
      toast.error("Error during registration"); // Display error message
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="modal-wrapper text-white bg-slate-700">
      <div className="modal-box w-[400px]">
        <div className="mb-5 shadow-md sticky top-0 bg-inherit p-4 border-inherit">
          <span
            onClick={handleCancel}
            className="close absolute top-4 right-2 cursor-pointer"
          >
            <MdClose size={25} />
          </span>
          <h1 className="text-2xl font-extrabold">Sign Up</h1>
        </div>
        <form onSubmit={handleSignUpSubmit} className="grid gap-2 p-4">
          <div className="grid gap-1">
            <label htmlFor="signup-username" className="form-label">
              Username
            </label>
            <input
              id="signup-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-input"
              required
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="signup-password" className="form-label">
              Password
            </label>
            <input
              id="signup-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-input"
              required
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-input"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <div>
            <button type="submit" className="submit-btn w-full">
              Sign Up
            </button>
            <span>
              Already have an account?
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
