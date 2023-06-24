import axiosClient from "../axiosClient";

export const markAsRead = (id: number) => {
  return axiosClient.put(`/api/notify/change-state/${id}`);
};
