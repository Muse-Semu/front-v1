import { createSlice } from "@reduxjs/toolkit";
import { getUserDetail, login } from "../api/APIService";
import { useSelector } from "react-redux";
import { loginStatus } from "./authSlice";
import { access_token } from "../service/localStorage";

const loggedUser = await loginStatus();
console.log("Loggedin User : ", loggedUser);
const userData =
  loggedUser &&
  (await getUserDetail(loggedUser.sub, access_token).then((res) => res.data));
const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthenticated: loggedUser ? true : false,
    user: userData ? userData : null,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    refreshTokenSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const authActions = authenticationSlice.actions;

export default authenticationSlice;
