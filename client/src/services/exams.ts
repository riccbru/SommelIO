import axiosClient from "./axiosClient";

async function createVisual(tid: string, data: any) {
	try {
		const response = await axiosClient.post(`/v1/exams/${tid}/visual`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
	}
}

async function createOlfactory(tid: string, data: any) {
	try {
		const response = await axiosClient.post(`/v1/exams/${tid}/olfactory`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
	}
}

async function createTaste(tid: string, data: any) {
	try {
		const response = await axiosClient.post(`/v1/exams/${tid}/taste`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
	}
}

async function createFinal(tid: string, data: any) {
	try {
		const response = await axiosClient.post(`/v1/exams/${tid}/final`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
	}
}

async function updateExam(tid: string, data: any, exam: string) {
	try {
		if (!["visual", "olfactory", "taste", "final"].includes(exam)) {
			throw new Error(`Invalid exam type: ${exam}`);
		}
		const response = await axiosClient.put(`/v1/exams/${tid}/${exam}`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to update exam ${exam}: ${error}`);
	}
}

async function createNewVisual(tid: string, data: any) {
	try {
		const response = await axiosClient.post(`/v2/exams/${tid}/visual`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
	}
}

async function createNewOlfactory(tid: string, data: any) {
	try {
		const response = await axiosClient.post(`/v2/exams/${tid}/olfactory`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
	}
}

async function createNewTaste(tid: string, data: any) {
	try {
		const response = await axiosClient.post(`/v2/exams/${tid}/taste`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
	}
}

async function createNewFinal(tid: string, data: any) {
	try {
		const response = await axiosClient.post(`/v2/exams/${tid}/final`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
	}
}

async function updateNewExam(tid: string, data: any, exam: string) {
	try {
		if (!["visual", "olfactory", "taste", "final"].includes(exam)) {
			throw new Error(`Invalid exam type: ${exam}`);
		}
		const response = await axiosClient.put(`/v2/exams/${tid}/${exam}`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to update exam ${exam}: ${error}`);
	}
}

const ExamsAPI = {
	createVisual,
	createNewVisual,
	createOlfactory,
	createNewOlfactory,
	createTaste,
	createNewTaste,
	createFinal,
	createNewFinal,
	updateExam,
	updateNewExam,
};

export default ExamsAPI;
