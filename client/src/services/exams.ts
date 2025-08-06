import axiosClient from './axiosClient';

async function createAllExams(tid: string, data: any) {
    try {
        console.log("creating all exams");
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
    }
}

async function createVisual(tid: string, data: any) {
    try {
        const response = await axiosClient.post(`/exams/${tid}/visual`, data);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
    }
}

async function createOlfactory(tid: string, data: any) {
    try {
        const response = await axiosClient.post(`/exams/${tid}/olfactory`, data);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
    }
}

async function createTaste(tid: string, data: any) {
    try {
        const response = await axiosClient.post(`/exams/${tid}/taste`, data);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
    }
}

async function createFinal(tid: string, data: any) {
    try {
        const response = await axiosClient.post(`/exams/${tid}/final`, data);
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data?.message || `Unable to fetch tastings: ${error}`);
    }
}

const ExamsAPI = {
    createAllExams,
    createVisual,
    createOlfactory,
    createTaste,
    createFinal
}

export default ExamsAPI;