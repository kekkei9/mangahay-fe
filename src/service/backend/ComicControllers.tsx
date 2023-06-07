import axiosClient from "@/services/backend/axiosClient";

export const likeComic = async ({ id, slug }: any) => {
  try {
    const responsePost = await axiosClient.post("/api/user/comic?action=like", {
      id_comic: id,
    });

    console.log(responsePost);
    const response = await axiosClient.get(
      `/api/comic/${slug}/increment?field=like&jump=1`
    );

    return response.data;
  } catch (e) {
    console.error("Lỗi khi lấy dữ liệu từ backend:", e);
    throw e;
  }
};

export const unLikeComic = async ({ id, slug }: any) => {
  try {
    const responseDelete = await axiosClient.delete(
      `/api/user/comic?id_comic=${id}&action=like`
    );
    const response = await axiosClient.get(
      `/api/comic/${slug}/increment?field=like&jump=-1`
    );
    return response.data;
  } catch (e) {
    console.error("Lỗi khi lấy dữ liệu từ backend:", e);
    throw e;
  }
};

export const followComic = async ({ id, slug }: any) => {
  try {
    const responsePost = await axiosClient.post(
      "/api/user/comic?action=follow",
      {
        id_comic: id,
      }
    );

    const response = await axiosClient.get(
      `/api/comic/${slug}/increment?field=follow&jump=1`
    );
    return response.data;
  } catch (e) {
    console.error("Lỗi khi lấy dữ liệu từ backend:", e);
  }
};

export const unFollowComic = async ({ id, slug }: any) => {
  try {
    const responseDelete = await axiosClient.delete(
      `/api/user/comic?id_comic=${id}&action=follow`
    );

    const response = await axiosClient.get(
      `/api/comic/${slug}/increment?field=follow&jump=-1`
    );
    return response.data;
  } catch (e) {
    console.error("Lỗi khi lấy dữ liệu từ backend:", e);
    throw e;
  }
};
