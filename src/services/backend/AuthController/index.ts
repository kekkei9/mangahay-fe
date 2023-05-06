import axios from "axios";

import { Response } from "@/types/Response.type";
import axiosClient from "../axiosClient";

//TODO
export function loginAPI(props: { email: string; password: string }) {
  const { email, password } = props;
  return axios.post<Response<any>>("/api/v1/auth/login", {
    username: email,
    password,
  });
}

export function getAuthenticatedUserAPI() {
  return axiosClient.get<Response<any>>("/api/v1/users/me");
}

export function refreshTokenAPI(refreshToken: string) {
  return axios.post<Response<any>>("/api/v1/auth/refresh", {
    refreshToken,
  });
}
