import axios from "axios";
import axiosClient from "../axiosClient";

export const signUpAPI = ({
  email,
  password,
  fullname,
}: {
  email: string;
  password: string;
  fullname: string;
}) => {
  return axios.post<any>("/api/auth/register", { email, password, fullname });
};

export const signOutRequest = () => {
  return axiosClient.get<any>("/api/auth/logout");
};

export function refreshTokenAPI(refreshToken: string) {
  return axios.post<any>("/api/v1/auth/refresh", {
    refreshToken,
  });
}
