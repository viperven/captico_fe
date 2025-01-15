import CookieService from "./CookieService";
import { jwtDecode } from "jwt-decode";
const baseUrl = DomainService.GetBaseUrl() + "auth";

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