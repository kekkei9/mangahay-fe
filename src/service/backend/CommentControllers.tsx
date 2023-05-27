import axios from 'axios';

const bEServer = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT

export const getComment = async (id:any) => {
  try {
    const response = await axios.get(`${bEServer}/api/comment/${id}/comments`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ backend:', error);
    throw error;
  }
};

export const postComment = async (id:any, content:any) => {
    try {
      const response = await axios.post(`${bEServer}/api/comment/${id}`, {
        content,
      }, {
        headers: {
          'Authorization': `bearer ${sessionStorage.getItem("access_token")}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu lên backend:', error);
      throw error;
    }
  };