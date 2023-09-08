import axios from 'axios';

export const axiosInstance = async (method, endpoint, payload) => {
    try {
        return await axios({
            method,
            url: endpoint,
            data: payload,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        );
    } catch (error) {
        return error
    }
}