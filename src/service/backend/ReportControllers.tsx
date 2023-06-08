import axios from 'axios';

const bEServer = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT

export const postReport = async(data:any) => {
    try{
        const response = await axios.post(`${bEServer}/api/report/create`,data,{
            headers: {
                'Authorization': `bearer ${sessionStorage.getItem("access_token")}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return response.data
    }catch (error){
        console.error('Lỗi khi gửi dữ liệu lên backend:', error);
        throw error;
    }
}