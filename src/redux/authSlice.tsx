// import {
//   getNewAccessToken,

import { jwtDecode } from "jwt-decode"
import { access_token, refresh_token } from "./authenticationSlice"
 

 
// } from "../api/APIService";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";


// const access_token = Cookies.get("access_token") || null;
// const refresh_token = Cookies.get("refresh_token") || null;

// var op = null





// const generateNewToken =  () => {
//   op =
//     refresh_token &&
//     ( getNewAccessToken().then((res) => res.data.access_token));
//   console.log("response of refresh_token:", op);

//   return op;
// };
// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginRequest.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(loginRequest.fulfilled, (state, action) => {
//         state.isLoading = false;
//       })
//       .addCase(loginRequest.rejected, (state, action) => {
//         state.isLoading = false;
//         state.hasError = true;
//         state.errorMessage =
//           action.error.message || "An error occurred during login.";
//       })

//       .addCase(getUser.pending, (state) => {
//         state.isLoading = true;
//       })

//       .addCase(getUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload;
//         state.isAuthenticated = true;
//       })

//       .addCase(logout.pending, (state) => {
//         // Start logout loading state
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state = initialState;
//       })
//       .addCase(logout.rejected, (state, action) => {
//         // Handle logout error
//       });
//   },
// });

// export const selectUser = (state: any) => state.auth.user;
// export const selectIsLoading = (state: any) => state.auth.isLoading;
// export const selectHasError = (state: any) => state.auth.hasError;
// export const selectErrorMessage = (state: any) => state.auth.errorMessage;
// export const authenticated = (state: any) => state.auth.isAuthenticated;

export const loginStatus = async ()=>{
  // console.log(access_token, refresh_token)
  if(access_token){
    return jwtDecode(access_token).sub
  }
  else{
    if(refresh_token){
      await generateToken().then(res=>console.log(res.data)
      )
    }
  }
  return null
}