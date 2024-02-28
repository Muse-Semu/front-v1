import { baseUrl } from "./http-common";
import useAuthStore from "@/redux/authenticationSlice";

const { accessToken, refreshToken }: any = useAuthStore.getState();

//********************** AUTHENTICATION ********************** //
export const login = async (data: {}) => {
  return await baseUrl.post("/auth/authenticate", data);
};

export const register = async (data: {}) => {
  return await baseUrl.post("/auth/register", data);
};

export const generateToken = async () => {
  return await baseUrl.post(`/auth/refresh_token`, refreshToken, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const logout = async () => {
  return await baseUrl.post("/auth/logout", accessToken, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};
