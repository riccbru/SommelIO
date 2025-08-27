import axios from "axios";
import config from "./config";

const axiosClient = axios.create({
	baseURL: `http://${config.HOSTNAME}:${config.PORT}/api/v1/auth`,
});

export type SignupData = {
	full_name: string;
	username: string;
	email: string;
	birthdate: string;
	password: string;
};

async function login(
	username: string,
	password: string
): Promise<{ newAccessToken: string; newRefreshToken: string }> {
	try {
		const response = await axiosClient.post("/login", { username, password });

		const newAccessToken = response.data.token;
		const newRefreshToken = response.headers["set-cookie"]
			?.find((cookie: string) => cookie.startsWith("refreshToken="))
			?.split(";")[0]
			.split("=")[1];

		if (!newAccessToken || !newRefreshToken) {
			throw new Error(
				!newAccessToken && !newRefreshToken
					? "newAccessToken and newRefreshToken are undefined"
					: !newAccessToken
						? "newAccessToken is undefined"
						: "newRefreshToken is undefined"
			);
		}

		return { newAccessToken, newRefreshToken };
	} catch (error: any) {
		throw new Error(error.response?.data?.error || `[services/auth.ts] Login failed: ${error}`);
	}
}

async function logout() {
	try {
		const response = await axiosClient.post("/logout", {});
		return response;
	} catch (error: any) {
		throw new Error(error.response?.data?.error || `[services/auth.ts] Signup failed: ${error}`);
	}
}

async function signup(data: SignupData) {
	try {
		const response = await axiosClient.post("/signup", data);
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.error || `[services/auth.ts] Signup failed: ${error}`);
	}
}

const AuthAPI = {
	login,
	logout,
	signup,
};

export default AuthAPI;
