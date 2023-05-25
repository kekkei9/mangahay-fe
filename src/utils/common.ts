import axiosClient from "@/services/backend/axiosClient";

export const fetcher = (url: string) => {
  return axiosClient.get(url).then((res) => res.data);
};
