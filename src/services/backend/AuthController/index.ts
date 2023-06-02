import { Account, Login, SignUp } from "@/types/Auth";
import axiosClient from "../axiosClient";
import { Response } from "@/types/Response.type";

export const requestChangePasswordAPI = ({ email }: { email: string }) => {
  return axiosClient.post<Response<any>>("/api/auth/forget-password", {
    email,
  });
};

export const changePasswordAPI = (password: string, token: string) => {
  return axiosClient.post<Response<any>>(
    `/api/auth/change-password?token=${token}`,
    {
      password,
    }
  );
};

export const signInAPI = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return axiosClient.post<Response<Login>>("/api/auth/login", {
    email,
    password,
  });
};

export const signUpAPI = ({
  email,
  password,
  fullname,
}: {
  email: string;
  password: string;
  fullname: string;
}) => {
  return axiosClient.post<Response<SignUp>>("/api/auth/register", {
    email,
    password,
    fullname,
  });
};

export const getCredentialsAPI = () => {
  return axiosClient.get<Response<Account>>("/api/user/credentials");
};

export const signOutAPI = () => {
  return axiosClient.get<any>("/api/auth/logout");
};

export function refreshTokenAPI(refreshToken: string) {
  return axiosClient.post<Response<any>>("/api/auth/refresh-token", {
    "refresh-token": refreshToken,
  });
}
