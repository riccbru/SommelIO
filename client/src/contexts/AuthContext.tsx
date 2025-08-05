import AuthAPI from "@/src/services/auth";
import UserAPI from "@/src/services/user";
import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useEffect, useState } from "react";
import { updateCachedToken, setCallback } from "@/src/services/axiosClient";

export type User = {
  uid: string;
  username: string;
  full_name: string;
  email: string;
}

export type AuthContextType = {
  isReady: boolean;
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (data: any) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [authStatus, setAuthStatus] = useState({
        isReady: false,
        isLoggedIn: false,
    });

    const [authData, setAuthData] = useState<{
        accessToken: string | null;
        refreshToken: string | null
        user: User | null;
    }>({
        accessToken: null,
        refreshToken: null,
        user: null
    });

    useEffect(() => {
        setCallback(
            (newToken: string) => {
                setAuthData(prev => ({ ...prev, accessToken: newToken }));
            },
            () => {
                setAuthData({
                  accessToken: null,
                  refreshToken: null,
                  user: null
                });
                setAuthStatus({ isReady: true, isLoggedIn: false });
                SecureStore.deleteItemAsync("refreshToken");
                logout();
            }
        );
        const checkAuth = async () => {
            try {
                const actualAccessToken = await SecureStore.getItemAsync("accessToken");
                const actualRefreshToken = await SecureStore.getItemAsync("refreshToken");

                if (actualAccessToken) {
                    updateCachedToken(actualAccessToken);
                    const actualUser = await UserAPI.getCurrentUser(actualAccessToken);
                    setAuthData({
                        accessToken: actualAccessToken,
                        refreshToken: actualRefreshToken,
                        user: actualUser
                    });
                    setAuthStatus({ isReady: true, isLoggedIn: true });
                    return;
                }
            } catch (error) {
                console.log("checkAuth:", error);
                await logout();
            }
            setAuthStatus({ isReady: true, isLoggedIn: false });
        };
        checkAuth();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const { newAccessToken, newRefreshToken } = await AuthAPI.login(username, password);
            const currentUser = await UserAPI.getCurrentUser(newAccessToken);
            await SecureStore.setItemAsync("accessToken", newAccessToken);
            await SecureStore.setItemAsync("refreshToken", newRefreshToken);
            updateCachedToken(newAccessToken);
            setAuthData({
                user: currentUser,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
            setAuthStatus({ isReady: true, isLoggedIn: true });
        } catch (error) {
            throw error;
        }
    }

    const logout = async () => {
        try {
            await AuthAPI.logout();
        } catch (error) {
            throw error;
        } finally {
            await SecureStore.deleteItemAsync("accessToken");
            await SecureStore.deleteItemAsync("refreshToken");
            updateCachedToken(null);
            setAuthData({
                accessToken: null,
                refreshToken: null,
                user: null
            });
            setAuthStatus({ isReady: true, isLoggedIn: false });
        }
    }

    const signup = async (data: any) => {
        try {
            const newUser = await AuthAPI.signup(data);
            setAuthData((prev) => ({ ...prev, user: newUser }));
        } catch (error) {
            throw error;
        }
    }

    const values = {
        ...authStatus,
        ...authData,
        login, logout, signup
    }

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );

}