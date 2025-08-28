import axiosClient from "./axiosClient";

async function fetchColleagues() {
	try {
		const response = await axiosClient.get(`/v1/colleagues`);
		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch colleagues: ${error}`);
	}
}

async function searchColleague(q: string) {
	try {
		const response = await axiosClient.get(`/v1/colleagues/search?q=${q}`);
		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to search colleague: ${error}`);
	}
}

async function sendRequest(cuid: string) {
	try {
		const response = await axiosClient.post(`/v1/colleagues/${cuid}`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(
			error.response?.data?.message || `Unable to fetch pending requests: ${error}`
		);
	}
}

async function getPendingRequests() {
	try {
		const response = await axiosClient.get(`/v1/colleagues/requests`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(
			error.response?.data?.message || `Unable to fetch pending requests: ${error}`
		);
	}
}

async function acceptRequest(rid: string) {
	try {
		const response = await axiosClient.put(`/v1/colleagues/accept/${rid}`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(
			error.response?.data?.message || `Unable to fetch pending requests: ${error}`
		);
	}
}

async function declineRequest(rid: string) {
	try {
		const response = await axiosClient.put(`/v1/colleagues/decline/${rid}`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(
			error.response?.data?.message || `Unable to fetch pending requests: ${error}`
		);
	}
}

async function blockColleague(cuid: string) {
	try {
		const response = await axiosClient.put(`/v1/colleagues/block/${cuid}`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(
			error.response?.data?.message || `Unable to fetch pending requests: ${error}`
		);
	}
}

async function unblockColleague(rid: string) {
	try {
		const response = await axiosClient.put(`/v1/colleagues/unblock/${rid}`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(
			error.response?.data?.message || `Unable to fetch pending requests: ${error}`
		);
	}
}

async function getBlockedColleagues() {
	try {
		const response = await axiosClient.get(`/v1/colleagues/blocked`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(
			error.response?.data?.message || `Unable to fetch pending requests: ${error}`
		);
	}
}

async function deleteColleague(rid: string) {
	try {
		const response = await axiosClient.delete(`/v1/colleagues/${rid}`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(
			error.response?.data?.message || `Unable to fetch pending requests: ${error}`
		);
	}
}

const ColleaguesAPI = {
	fetchColleagues,
	getPendingRequests,
	acceptRequest,
	declineRequest,
	sendRequest,
	blockColleague,
	getBlockedColleagues,
	unblockColleague,
	searchColleague,
	deleteColleague,
};

export default ColleaguesAPI;
