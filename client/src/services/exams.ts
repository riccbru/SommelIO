import axiosClient from "./axiosClient";

async function createExam(tid: string, data: any, exam: string) {
	try {
		if (!["visual", "olfactory", "taste", "final"].includes(exam)) {
			throw new Error(`Invalid exam type: ${exam}`);
		}
		const response = await axiosClient.post(`/exams/${tid}/${exam}`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to create exam ${exam}: ${error}`);
	}
}

async function updateExam(tid: string, data: any, exam: string) {
	try {
		if (!["visual", "olfactory", "taste", "final"].includes(exam)) {
			throw new Error(`Invalid exam type: ${exam}`);
		}
		const response = await axiosClient.put(`/exams/${tid}/${exam}`, data);
		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.response?.data?.message || `Unable to update exam ${exam}: ${error}`);
	}
}

const ExamsAPI = {
	createExam,
	updateExam,
};

export default ExamsAPI;
