import { axiosInstance } from './index';


export const GetAllBloodGroups = async () => {
    const response = await axiosInstance('get', '/api/dashboard/get-all-blood');
    return response;
}