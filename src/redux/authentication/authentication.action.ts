import { Dispatch } from "redux";
import { authenticationActions } from "./authentication.slice";
import Cookies from "js-cookie";
import { getCredentialsAPI } from "@/services/backend/AuthController";
import { Login } from "@/types/Response.type";

export const loginStorageHandler = (loginData: Login) => {
  return async (dispatch: any) => {
    Cookies.set("token", loginData.access_token);
    Cookies.set("refreshToken", loginData.refresh_token);

    const {
      data: { result: userData },
    } = await getCredentialsAPI();

    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(authenticationActions.setUser(userData));
  };
};

export const logoutHandler = () => {
  return (dispatch: Dispatch) => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    localStorage.removeItem("user");
    dispatch(authenticationActions.logout());
  };
};
