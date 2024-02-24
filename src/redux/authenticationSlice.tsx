import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { generateToken, getUserDetail } from "../api/APIService";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


export const access_token = Cookies.get("access_token") || null;
export const refresh_token = Cookies.get("refresh_token") || null;

const loginStatus = async () => {
  if (access_token) {
    const decoded = jwtDecode(access_token);
    return decoded.sub;
  } else {
    if (refresh_token) {
      console.log("Refdjd", jwtDecode(refresh_token).sub);
      generateToken().then(res=>Cookies.set("access_token",res.data.access_token))
      return jwtDecode(refresh_token).sub;
    } else {
      return null;
    }
  }
};


const loggedUser =  await loginStatus();

export const getUser:any = createAsyncThunk("fetch/account", async ()=>{
    try { 
      return await getUserDetail(loggedUser).then(res=>res.data)
    } catch (error) {
      return null;
    }
})

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthenticated: loggedUser ? true : false,
    accessToken: access_token ? access_token : null,
    refreshToken: refresh_token ? refresh_token : null,
    user: loggedUser ? loggedUser : null,
    status:"idle",
    account : null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user,
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      Cookies.remove("access_token")
      Cookies.remove("refresh_token")
    },
    refreshTokenSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },

    extraReducers: (builder) => {
      builder
        .addCase(getUser.pending, (state) => {
          state.status = "pending";
        })

        .addCase(getUser.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.account = action.payload;
        })

        .addCase(getUser.rejected,(state,action)=>{
          state.status = "pending"
          state.account = null
        })

       
    },
});
export const accountStatus = (state: any) => state.authentication.status

export const accountData = (state: any) => state.authentication.account

export const authActions = authenticationSlice.actions;
export default authenticationSlice;
