import axiosClient, { setAuthToken } from "@/services/backend/axiosClient";

export const fetcher = (token?: string) => (url: string) => {
  setAuthToken(token);
  return axiosClient.get(url).then((res) => res.data);
};
