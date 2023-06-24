import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { refreshTokenAPI, signOutAPI } from "./AuthController";
import store from "@/redux";
import { logoutHandler } from "@/redux/authentication/authentication.action";

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

const axiosClient = axios.create({
  baseURL: DEFAULT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    if (
      originalRequest.url === "/api/auth/refresh-token" &&
      error?.response?.status === 500
    ) {
      try {
        await signOutAPI();
      } catch (e) {
        console.error(e);
      }
      store.dispatch(logoutHandler() as any);
      delete axiosClient.defaults.headers.common.Authorization;
      return axios(originalRequest);
    }

    if (error?.response?.status === 403) {
      if (!originalRequest?.retry) {
        originalRequest.retry = true;
        const access_token = await refreshToken();
        setAuthToken(access_token as string);
        axiosClient.defaults.headers.common["Authorization"] =
          "Bearer " + access_token;
        originalRequest.headers["Authorization"] = "Bearer " + access_token;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export const setAuthToken = (token?: string) => {
  if (token) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common.Authorization;
  }
};

// hàm để refresh token
const refreshToken = async () => {
  const refreshToken = Cookies.get(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string
  );
  if (!refreshToken) {
    return null;
  }
  try {
    const {
      data: { result },
    } = await refreshTokenAPI(refreshToken);
    Cookies.set(
      process.env.NEXT_PUBLIC_TOKEN_KEY as string,
      result.access_token
    );
    Cookies.set(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
      result.refresh_token
    );
    await setAuthToken(result.access_token);
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetcher = (url: string) => {
  return axiosClient.get(url).then((res) => res.data);
};

export default axiosClient;
