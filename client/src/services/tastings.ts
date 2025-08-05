import axiosClient from './axiosClient';

async function fetchTastings() {
    try {
        const response = await axiosClient.get('/tastings');
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
    }
}

async function createTasting(data: any) {
    try {
        const response = axiosClient.post('/tastings', data);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to create tasting: ${error}`);
    }
}

async function updateTasting(tid: string, data: any) {
    try {
        const response = axiosClient.put('/tastings', data);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to update tasting: ${error}`);
    }
}

async function deleteTasting(tid: string) {
    try {
        const response = axiosClient.delete('/tastings');
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to create tasting: ${error}`);
    }
}

const TastingsAPI = { fetchTastings, updateTasting, createTasting, deleteTasting }
export default TastingsAPI;