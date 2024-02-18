import jwtDecode from "jwt-decode";

export const access_token =
  localStorage.getItem("access_token") !== "undefined"
    ? localStorage.getItem("access_token")
    : "";

export const refresh_token =
  localStorage.getItem("refresh_token") !== "undefined"
    ? localStorage.getItem("refresh_token")
    : "";
