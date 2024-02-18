import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNewAccessToken,
  getUserDetail,
  login,
  refreshToken,
} from "../api/APIService";
import { jwtDecode } from "jwt-decode";
import { access_token, refresh_token } from "../service/localStorage";

export const loginRequest = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }) => {
    const response: any = login(credentials);
    return response.data;
  }
);

const generateNewToken = async (refreshToken) => {
  const decoder: {} | any = refreshToken && jwtDecode(refreshToken);
  if (decoder.exp < Math.floor(Date.now() / 1000)) {
    return;
  }
  const op = await getNewAccessToken(refreshToken).then(
    (res) => res.data.access_token
  );
  console.log("response of refresh_token:", op);

  return op;
};

export const loginStatus = async () => {
  const token = access_token;
  const decoder: {} | any = token && jwtDecode(token);
  if (decoder.exp < Math.floor(Date.now() / 1000)) {
    console.log("Token is expired please , Login again!");
    const refreshToken = refresh_token;
    const new_token = refreshToken && (await generateNewToken(refreshToken));
    localStorage.setItem("access_token", new_token);
    const refresh = new_token && jwtDecode(new_token);
    console.log("refresh", refresh);
    return refresh;
  } else {
    return decoder && decoder;
  }
};

export const getUser: any = createAsyncThunk("auth/user_detail", async () => {
  const user: any = loginStatus();
  const response = user ? await getUserDetail(user && user.sub) : null;
  // console.log(response);
  return response && response.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.clear();
});
const initialState = {
  user: {},
  isLoading: false,
  hasError: false,
  errorMessage: "",
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage =
          action.error.message || "An error occurred during login.";
      })

      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(logout.pending, (state) => {
        // Start logout loading state
      })
      .addCase(logout.fulfilled, (state) => {
        state = initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        // Handle logout error
      });
  },
});

export const selectUser = (state: any) => state.auth.user;
export const selectIsLoading = (state: any) => state.auth.isLoading;
export const selectHasError = (state: any) => state.auth.hasError;
export const selectErrorMessage = (state: any) => state.auth.errorMessage;
export const authenticated = (state: any) => state.auth.isAuthenticated;
export default authSlice.reducer;
