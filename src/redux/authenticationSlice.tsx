import {create} from "zustand";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const access_token = Cookies.get("access_token") || null;
const refresh_token = Cookies.get("refresh_token") || null;

// const loginStatus = async () => {
//   if (access_token) {
//     const decoded =jwtDecode(access_token);
//     return decoded.sub;
//   } else {
//     if (refresh_token) {
//       console.log("Refdjd", jwtDecode(refresh_token).sub);
//       try {
//         const res = await generateToken();
//         Cookies.set("access_token", res.data.access_token);
//         return jwtDecode(refresh_token).sub;
//       } catch (error) {
//         console.error("Error generating token:", error);
//         return null;
//       }
//     } else {
//       return null;
//     }
//   }
// };

// Note: Zustand does not support async actions out of the box.
// You may need to handle async operations outside of Zustand.

const decoded = (token: string) => {
  return token ? jwtDecode(token).sub : null;
};

interface AuthType {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: string | null | undefined;
  userData: {} | null;
  loginStatus:string;
  account: (user: any) => void;
  loginSuccess: (access: string, refresh: string, email: string) => void;
  logoutSuccess: () => void;
  refreshTokenSuccess: (accessToken: string) =>void;
}

const useAuthStore = create<AuthType>((set) => ({
  accessToken: access_token,
  refreshToken: refresh_token,
  isAuthenticated: access_token || refresh_token ? true : false,
  user: decoded(access_token || refresh_token),
  userData: null,
  loginStatus:"idle",
  account:  (user: any) => {
    set({ userData: user });
  },
  loginSuccess: (access: string, refresh: string, email: string) => {
    set({
      isAuthenticated: true,
      accessToken: access,
      refreshToken: refresh,
      user: email,
      loginStatus: "success",
    });
  },
  logoutSuccess: () => {
    set({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      user: null,
    });
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  },
  refreshTokenSuccess: (newToken:string) => {
    set({ accessToken:newToken });
    Cookies.set("access_token", newToken, {
      expires: 1 / (24),
      secure: true,
    });
  },
}));

export const accountStatus = (state: any) => state.status;
export const accountData = (state: any) => state.account;

export default useAuthStore;
