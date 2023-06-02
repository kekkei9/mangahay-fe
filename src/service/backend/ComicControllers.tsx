import axios from "axios";

const bEServer = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

export const getLikeAndFollowState = async (id: any) => {
  try {
    const response = await axios.get(
      `${bEServer}/api/user/comic/check/?id_comic=${id}`,
      {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Lỗi khi lấy dữ liệu từ backend:", e);
    throw e;
  }
};

export const likeComic = async (name: any) => {
  try {
    const response = await axios.post(
      `${bEServer}/api/user/comic/${name}/?field=like&jump=1`,
      {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Lỗi khi lấy dữ liệu từ backend:", e);
    throw e;
  }
};

export const unLikeComic = async (name: any) => {
  try {
    const response = await axios.post(
      `${bEServer}/api/user/comic/${name}/?field=like&jump=-1`,
      {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Lỗi khi lấy dữ liệu từ backend:", e);
    throw e;
  }
};

export const viewComic = async (name: any) => {
  try {
    const response = await axios.post(
      `${bEServer}/api/user/comic/${name}/?field=view&jump=1`,
      {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Lỗi khi lấy dữ liệu từ backend:", e);
    throw e;
  }
};

export const FollowComic = async (name: any) => {
  try {
    const response = await axios.post(
      `${bEServer}/api/user/comic/${name}/?field=follow&jump=1`,
      {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Lỗi khi lấy dữ liệu từ backend:", e);
    throw e;
  }
};

export const unFollowComic = async (name: any) => {
  try {
    const response = await axios.post(
      `${bEServer}/api/user/comic/${name}/?field=follow&jump=-1`,
      {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("Lỗi khi lấy dữ liệu từ backend:", e);
    throw e;
  }
};
