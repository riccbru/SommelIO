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
        throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
    }
}

async function createTasting(token: string, data: any) {
    try {
        const response = axiosClient.post('/tastings', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to create tasting: ${error}`);
    }
}

async function updateTasting(tid: string, token: string, data: any) {
    try {
        const response = axiosClient.put('/tastings', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to update tasting: ${error}`);
    }
}

async function deleteTasting(tid: string, token: string) {
    try {
        const response = axiosClient.delete('/tastings', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to create tasting: ${error}`);
    }
}

const TastingsAPI = { fetchTastings, updateTasting, createTasting, deleteTasting }
export default TastingsAPI;