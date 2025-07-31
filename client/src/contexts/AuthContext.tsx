import AuthAPI from "@/src/API/auth";
import UserAPI from "@/src/API/user";
import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useEffect, useState } from "react";

export type User = {
  uid: string;
  username: string;
  full_name: string;
  email: string;
}

export type AuthContextType = {
  isReady: boolean;
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    
    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        }
        setIsReady(true);
    }
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { accessToken, refreshToken } = await AuthAPI.login(username, password);
      await SecureStore.setItemAsync('token', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
      const userData = await UserAPI.getCurrentUser(accessToken);
      setUser(userData);
      setIsLoggedIn(true);
      setToken(accessToken);
    } catch (error) {
      console.log(`AuthContext's useEffect: ${error}`);
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('refreshToken');
  };
  
  const values: AuthContextType = {
    isReady, isLoggedIn,
    user, token,
    login, logout
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};