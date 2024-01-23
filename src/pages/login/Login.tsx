import { useState } from "react";
import { MdClose } from "react-icons/md";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(username,password)
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
              value={username}
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
            <span>Don't have an account ?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
