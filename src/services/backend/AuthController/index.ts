import axios from "axios";

export const signUp = ({
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

export function refreshTokenAPI(refreshToken: string) {
  return axios.post<any>("/api/v1/auth/refresh", {
    refreshToken,
  });
}
