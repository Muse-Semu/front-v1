import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const decoded = jwtDecode(accessToken);
  if (decoded.exp < Date.now() / 1000) {
    // Access token expired, attempt to refresh
    try {
      await refreshToken();
    } catch (error) {
      // Refresh failed, redirect to login
      dispatch(logout());
      navigate("/login");
      return;
    }
  }
} else {
  // No access token, redirect to login
  navigate("/login");
  return;
}

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await instance.post("/refreshToken", { refreshToken });
    localStorage.setItem("accessToken", response.data.accessToken);
    dispatch(login(response.data));
  } catch (error) {
    // Handle refresh token errors
    throw error;
  }
};
