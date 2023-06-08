import axiosClient from "@/services/backend/axiosClient";

export const postComment = async (id: any, content: any) => {
  try {
    const response = await axiosClient.post(`/api/comment/${id}`, {
      content,
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu lên backend:", error);
    throw error;
  }
};
