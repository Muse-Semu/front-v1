import axios from "axios";
// import { login, logout } from "./features/auth/authSlice";

const instance = axios.create({
  baseURL: "http://your-spring-boot-api-url",
});

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await instance.post("/login", { username, password });
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    dispatch(login(response.data));
    return response.data;
  } catch (error) {
    // Handle login errors
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  dispatch(logout());
};

// Implement refreshToken logic here
