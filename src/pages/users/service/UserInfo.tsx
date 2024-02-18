import { useEffect, useState } from "react";
import axios from "axios";
import { access_token, refresh_token } from "../../../service/localStorage";
import { JwtDecodeOptions, JwtHeader, JwtPayload, jwtDecode } from "jwt-decode";
import { getNewAccessToken, getUserDetail } from "../../../api/APIService";
import { Navigate, useNavigate } from "react-router-dom";

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState();
  const access: string | null = access_token;
  const refresh: string | null = refresh_token;

  const isTokenExpired = (token: any) => {
    const decode: any = jwtDecode(token);
    return decode.exp < Date.now() / 1000;
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const decode = jwtDecode(access);
        console.log("access_token expired: " + isTokenExpired(access));
        console.log("refresh_token expired : " + isTokenExpired(refresh));

        if (isTokenExpired(access)) {
          if (!isTokenExpired(refresh)) {
            console.log(
              isTokenExpired(refresh) + " " + refresh + " is not expired"
            );
            const access: any = await getNewAccessToken(refresh);
            console.log("response : " + access.data);
            const decoded: any = jwtDecode(access.data);
            console.log("User : " + decoded);

            const response = await getUserDetail(decoded.sub);
            setUserInfo(response.data);
            localStorage.setItem("access_token", access.data);
          } else {
          }
        } else {
          await getUserDetail(decode.sub).then((res) => setUserInfo(res.data));
          
        }
      } catch (error) {
        // return <Navigate to="/login"></Navigate>;
      }
    };

    fetchUserInfo();
  }, []);

  return userInfo;
};
