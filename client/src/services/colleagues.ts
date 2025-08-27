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

async function getPendingRequests() {
	try {
		const response = await axiosClient.get(`/colleagues/requests`);
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
		const response = await axiosClient.put(`/colleagues/accept/${rid}`);
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
		const response = await axiosClient.put(`/colleagues/decline/${rid}`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(
			error.response?.data?.message || `Unable to fetch pending requests: ${error}`
		);
	}
}

async function sendRequest(cuid: string) {
	try {
		const response = await axiosClient.post(`/colleagues/${cuid}`);
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
		const response = await axiosClient.put(`/colleagues/block/${cuid}`);
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
		const response = await axiosClient.put(`/colleagues/unblock/${rid}`);
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
		const response = await axiosClient.get(`/colleagues/blocked`);
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
		const response = await axiosClient.delete(`/colleagues/${rid}`);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(
			error.response?.data?.message || `Unable to fetch pending requests: ${error}`
		);
	}
}

async function searchColleague(q: string) {
	try {
		const response = await axiosClient.get(`/colleagues/search?q=${q}`);
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
