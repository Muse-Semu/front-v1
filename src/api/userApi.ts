import { baseUrl } from "./http-common";
import useAuthStore from "@/redux/authenticationSlice";

const { accessToken, refreshToken }: any = useAuthStore.getState();

// ********************** USER ********************** //

export const addUser = async (data: {}) => {
  const user = await baseUrl
    .post("/user", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
  return user;
};

export const getUserDetail = async (email: string, token: string) => {
  return await baseUrl.get(`/user/detail/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getUserById = async (id: number, token: string) => {
  console.log("Recieved Token", token);
  return await baseUrl.get(`/user/get/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getAllUser = async (token: any) => {
  console.log("Recieved token ", token);
  return await baseUrl.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
