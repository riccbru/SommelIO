import axiosClient from './axiosClient';

async function getCurrentUser(newToken: string) {
    try {
        const response = await axiosClient.get('/users/me', {
            headers: {
                Authorization: `Bearer ${newToken}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to fetch user: ${error}`);
    }
}

const UserAPI = { getCurrentUser }

export default UserAPI;