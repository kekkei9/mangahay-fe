import { Dispatch } from "redux";
import { authenticationActions } from "./authentication.slice";
import Cookies from "js-cookie";
import {
  getCredentialsAPI,
  signOutAPI,
} from "@/services/backend/AuthController";
import { Login } from "@/types/Auth";
import { setAuthToken } from "@/services/backend/axiosClient";

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
  return async (dispatch: Dispatch) => {
    try {
      await signOutAPI();
    } catch (e) {
      console.error(e);
    }
    setAuthToken();
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    localStorage.removeItem("user");
    dispatch(authenticationActions.logout());
  };
};
