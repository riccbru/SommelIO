import axiosClient from './axiosClient';

async function fetchTastings(token: string | null) {
    try {
        const response = await axiosClient.get('/tastings', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to fetch user: ${error}`);
    }
}

const TastingsAPI = { fetchTastings }

export default TastingsAPI;