import axiosClient from "./axiosClient";

async function getCurrentUser(accessToken: string | null) {
	try {
		const response = await axiosClient.get("/v1/users/me", {
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
		const response = await axiosClient.get("/v1/users/me/stats", {
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

async function fetchUserStats(uid: string) {
	try {
		const response = await axiosClient.get(`/v1/users/${uid}/stats`);
		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(
			error.response?.data?.message || `Unable to fetch user ${uid} stats: ${error}`
		);
	}
}

const UserAPI = { getCurrentUser, getStats, fetchUserStats };

export default UserAPI;
