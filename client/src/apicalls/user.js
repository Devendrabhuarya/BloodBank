
import { axiosInstance } from './index'

export const LoginUser = async (payload) => {
    const response = await axiosInstance('post', '/api/users/login', payload);
    return response;
}

export const RegisterUser = async (payload) => {
    const response = await axiosInstance('post', '/api/users/register', payload);
    return response;
};

export const getCurrentUser = async () => {
    const response = await axiosInstance('get', '/api/users/get-current-user');
    return response;
}
export const getDonerOfOrgnization = async () => {
    const response = await axiosInstance('get', '/api/users/get-all-doner');
    return response;
}
export const getHospitalOfOrgnization = async () => {
    const response = await axiosInstance('get', '/api/users/get-all-hospital');
    return response;
}
export const getOrgnizationForDoner = async () => {
    const response = await axiosInstance('get', '/api/users/get-orgnization-of-a-doner');
    return response;
}
export const getOrgnizationForHospital = async () => {
    const response = await axiosInstance('get', '/api/users/get-orgnization-of-a-hospital');
    return response;
}