import axiosClient from './axiosClient';

async function login(username: string, password: string): Promise<{ newAccessToken: string; newRefreshToken: string }> {
    try {
        const response = await axiosClient.post('/auth/login', { username, password });

        const newAccessToken = response.data.token;
        const newRefreshToken = response.headers['set-cookie']?.find(
            (cookie: string) => cookie.startsWith('refreshToken=')
        )?.split(';')[0].split('=')[1];

        if (!newAccessToken || !newRefreshToken) {
            throw new Error(
                !newAccessToken && !newRefreshToken
                ? 'newAccessToken and newRefreshToken are undefined'
                : !newAccessToken
                ? 'newAccessToken is undefined'
                : 'newRefreshToken is undefined'
            );
        }

        return { newAccessToken, newRefreshToken };
    } catch (error: any) {
        console.error('Login error:', error);
        throw new Error(error.response?.data?.message || `Login failed: ${error}`);
    }
}

async function logout(): Promise<void> {
    console.log('Logged out');
}

const AuthAPI = {
    login,
    logout
};

export default AuthAPI;
