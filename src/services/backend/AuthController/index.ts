import axiosClient from "../axiosClient";
import { Response, SignUp } from "@/types/Response.type";

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

export const signOutAPI = () => {
  return axiosClient.get<any>("/api/auth/logout");
};

export function refreshTokenAPI(refreshToken: string) {
  return axiosClient.post<any>("/api/v1/auth/refresh", {
    refreshToken,
  });
}
