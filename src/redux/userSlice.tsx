import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "../api/APIService";
import Cookies from "js-cookie";

export interface StateType {
  users: any[];
  status: string;
  error: any;
}

const access_token = Cookies.get("access_token") || null;

const initialState: StateType = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers: any = createAsyncThunk<any[], void>(
  "fetch/users",
  async () => {
    try {
      const response = await getAllUser(access_token).then((res) => res.data);
      
      return [...response];
    } catch (error: any) {
      return [];
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "pending";
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllusers = (state: any) => state.user.users;
export const getUserStatus = (state: any) => state.user.status;
export const getUserError = (state: any) => state.user.error;

export const userAction = userSlice.actions;

export default userSlice;
