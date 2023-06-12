import axiosClient from "@/services/backend/axiosClient";

export const postReport = async (data: any) => {
  try {
    const response = await axiosClient.post("/api/report/create", data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu lên backend:", error);
    throw error;
  }
};
