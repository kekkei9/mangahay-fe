import { Dispatch } from "redux";
import { authenticationActions } from "./authentication.slice";
import Cookies from "js-cookie";
import { getCredentialsAPI } from "@/services/backend/AuthController";
import axiosClient, { setAuthToken } from "@/services/backend/axiosClient";

export const loginStorageHandler = (loginData: { access_token: string }) => {
  return async (dispatch: any) => {
    Cookies.set("token", loginData.access_token);

    const { data: res } = await getCredentialsAPI();

    const userData = { ...loginData, ...res.result };

    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(authenticationActions.setUser(userData));
  };
};

export const logoutHandler = () => {
  return (dispatch: Dispatch) => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    dispatch(authenticationActions.logout());
  };
};
