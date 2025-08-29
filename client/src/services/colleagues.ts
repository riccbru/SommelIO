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

async function getRequests() {
	try {
		const response = await axiosClient.get(`/v1/colleagues/requests`);
		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(
			error.response?.data?.message || `Unable to fetch all pending requests: ${error}`
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
			error.response?.data?.message || `Unable to accept pending requests: ${error}`
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
			error.response?.data?.message || `Unable to decline pending requests: ${error}`
		);
	}
}

async function blockColleague(cuid: string) {
	try {
		const response = await axiosClient.put(`/v1/colleagues/block/${cuid}`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to block colleague: ${error}`);
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
		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(
			error.response?.data?.message || `Unable to fetch pending requests: ${error}`
		);
	}
}

async function removeColleague(cuid: string) {
	try {
		const response = await axiosClient.delete(`/v1/colleagues/${cuid}`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to remove colleague: ${error}`);
	}
}

const ColleaguesAPI = {
	fetchColleagues,
	searchColleague,
	sendRequest,
	getRequests,

	acceptRequest,
	declineRequest,
	blockColleague,
	getBlockedColleagues,
	unblockColleague,
	removeColleague,
};

export default ColleaguesAPI;
