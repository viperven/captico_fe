import CookieService from "./CookieService";
import { jwtDecode } from "jwt-decode";
// const baseUrl = DomainService.GetBaseUrl() + "auth";

const validateToken = () => {
  try {
    const token = CookieService.getCookie("token");

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        return true;
      } else {
        CookieService.clearCookie("token");
      }
      return false;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e.message);
  }
};

const isAuthenticatedUser = () => {
  try {
    if (validateToken()) {
      return true;
    }
    CookieService.clearCookie();
    return false;
  } catch (error) {
    console.error("Error:", error);
  }
};

const logout = () => {
  CookieService.clearCookie("token");
};

const getApiAuthorizationConfig = () => {
  let config = "";
  if (CookieService.getCookie("token")) {
    config = "Bearer " + CookieService.getCookie("token");
  }
  return config;
};

export const AuthService = {
  isAuthenticatedUser,
  logout,
  getApiAuthorizationConfig,
};
