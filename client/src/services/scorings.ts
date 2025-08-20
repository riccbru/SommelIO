import axiosClient from "./axiosClient";

async function createScoring(tid: string, data: any) {
	try {
		const response = await axiosClient.post(`/scoring/${tid}`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to create scoring: ${error}`);
	}
}

async function updateScoring(tid: string, data: any) {
	try {
		const response = await axiosClient.put(`/scoring/${tid}`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to update scoring: ${error}`);
	}
}

async function fetchCoefficients() {
	try {
		const response = await axiosClient.get("/scoring/coefficients");
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch coefficients: ${error}`);
	}
}

const ScoringsAPI = {
	createScoring,
	updateScoring,
	fetchCoefficients,
};

export default ScoringsAPI;
