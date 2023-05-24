import { Dispatch } from "redux";
import { authenticationActions } from "./authentication.slice";
import Cookies from "js-cookie";

export const loginStorageHandler = (loginData: { token: string }) => {
  return (dispatch: Dispatch) => {
    Cookies.set("token", loginData.token);
    localStorage.setItem("user", JSON.stringify(loginData));
    dispatch(authenticationActions.setUser(loginData));
  };
};

export const logoutHandler = () => {
  return (dispatch: Dispatch) => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    dispatch(authenticationActions.logout());
  };
};
