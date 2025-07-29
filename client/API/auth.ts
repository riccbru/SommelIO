import axiosClient from './axiosClient';

async function login(username: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
        const response = await axiosClient.post('/auth/login', { username, password });

        const accessToken = response.data.token;
        const refreshToken = response.headers['Set-Cookie']?.find(
            (cookie: string) => cookie.startsWith('refreshToken=')
        )?.split(';')[0].split('=')[1];

        console.log(`Access Token: ${accessToken}`);
        console.log(`Refresh Token: ${refreshToken}`);

        return { accessToken, refreshToken };
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
