import AuthAPI from "@/API/auth";
import UserAPI from "@/API/user";
import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useEffect, useState } from "react";

export type User = {
    uid: string;
    username: string;
    full_name: string;
    email: string;
}

export type AuthContextType = {
    loading: boolean;
    user: User | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

  useEffect(() => {

    const checkAuth = async () => {
        try {
            const accessToken = await SecureStore.getItemAsync('token');
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            if (accessToken) {
                setToken(accessToken);
                const userData = await UserAPI.getCurrentUser(accessToken);
                setUser(userData);
            }
        } catch (err) {
            console.log(err);
            await logout();
        } finally {
            setLoading(false);
        }
    }
    login('bankich', 'bankich_pwd');
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
        const { accessToken, refreshToken } = await AuthAPI.login(username, password);
        setToken(accessToken);
        console.log(accessToken);
        await SecureStore.setItemAsync('token', accessToken);
        await SecureStore.setItemAsync('refreshToken', refreshToken);
        const userData = await UserAPI.getCurrentUser(accessToken);
        setUser(userData);
    } catch (error) {
        console.log(error);
        throw new Error('Login failed');
    } finally {
        setLoading(false);
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('refreshToken');
  };
  
  const values: AuthContextType = {
    loading,
    user, token,
    login, logout
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};