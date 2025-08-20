import axiosClient from "./axiosClient";

async function fetchWines() {
	try {
		const response = await axiosClient.get("/wines");
		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch wines: ${error}`);
	}
}

async function fetchWineById(wid: string) {
	try {
		const response = await axiosClient.get(`/wines/${wid}`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch wine ${wid}: ${error}`);
	}
}

async function createWine(data: any) {
	try {
		const response = axiosClient.post("/wines", data);
		return response;
	} catch (error: any) {
		console.log(error);
		throw new Error(error.response?.data?.message || `Unable to create wine: ${error}`);
	}
}

async function deleteWine(wid: string) {
	try {
		const response = axiosClient.delete(`/wines/${wid}`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to delete wine: ${error}`);
	}
}

const WinesAPI = {
	fetchWines,
	fetchWineById,
	createWine,
	deleteWine,
};
export default WinesAPI;
