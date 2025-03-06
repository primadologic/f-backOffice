
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './auth-context';
import { API_BASE_URL, API_KEY } from '@/lib/env_vars';
import Cookies from "js-cookie";


// Authentication Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(Cookies.get("accessToken") ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  // Function to get token expiration time
  // const getTokenExpirationTime = (expiresInMinutes: number) => {
  //   return new Date(new Date().getTime() + expiresInMinutes * 60 * 1000);
  // };

  // Function to refresh token
  const refreshAccessToken = async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) return logout();

    try {
      const response = await axios.get(`${API_BASE_URL}/auth/refresh/token`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "X-API-KEY": API_KEY,
        },
      });

      const { accessToken } = response.data.data; // Backend should return `expiresIn` (in minutes)

      // Store new token with expiration time
      Cookies.set("accessToken", accessToken, { expires: 30 / 1440, secure: true, sameSite: "Strict" });
      setToken(accessToken);
      setIsAuthenticated(true);

      return accessToken;
    } catch (error) {
      console.error("Token refresh failed", error);
      logout();
      return null;
    }
  };

  // Axios Interceptors
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        let currentToken = Cookies.get("accessToken");

        if (!currentToken) {
          currentToken = await refreshAccessToken();
        }

        if (currentToken) {
          config.headers['Authorization'] = `Bearer ${currentToken}`;
          config.headers['X-API-KEY'] = API_KEY;
        }
        
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  // Login function
  const login = (newToken: string, refreshToken: string) => {

    // Convert expiration time from minutesto days
    const acceessTokenExpiresInDays = 30 / 1440;
    const refreshExpiresInDays = 60 / 1440; // Refresh token expires in 1 hour
    
    Cookies.set("accessToken", newToken, { expires: acceessTokenExpiresInDays, secure: true, sameSite: "Strict" });
    Cookies.set("refreshToken", refreshToken, { expires: refreshExpiresInDays, secure: true, sameSite: "Strict" }); 

    setToken(newToken);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
