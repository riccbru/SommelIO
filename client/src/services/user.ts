import axiosClient from "./axiosClient";

async function getCurrentUser(accessToken: string | null) {
	try {
		const response = await axiosClient.get("/users/me", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch user: ${error}`);
	}
}

async function getStats(accessToken: string | null) {
	try {
		const response = await axiosClient.get("/users/me/stats", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch user stats: ${error}`);
	}
}

const UserAPI = { getCurrentUser, getStats };

export default UserAPI;
