import axiosClient from "./axiosClient";

async function getCurrentUser() {
	try {
		const response = await axiosClient.get("/users/me");
		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch user: ${error}`);
	}
}

async function getStats() {
	try {
		const response = await axiosClient.get("/users/me/stats");
		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch user stats: ${error}`);
	}
}

const UserAPI = { getCurrentUser, getStats };

export default UserAPI;
