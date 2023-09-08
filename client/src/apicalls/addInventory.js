import { axiosInstance } from './index';

export const AddInventory = async (payload) => {
    const response = await axiosInstance('post', '/api/inventory/add', payload);
    return response;
}
export const GetInventory = async (payload) => {

    const response = await axiosInstance('post', '/api/inventory/get', payload);
    return response;
}

export const GetInventoryForDonerOrHospital = async (Filter) => {
    const { filter, limit } = Filter;
    const response = await axiosInstance('post', '/api/inventory/filter', { filter, limit });
    return response;
}
// export const GetInventoryForDonerOrHospital = async (filter) => {
//     console.log(filter);
//     const response = await axiosInstance('post', '/api/inventory/filter', { filter });
//     return response;
// }