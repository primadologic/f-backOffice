import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from './auth-context';
import { API_BASE_URL, API_KEY } from '@/lib/env_vars';
import Cookies from "js-cookie";

// Authentication Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(Cookies.get("accessToken") ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const tokenRefreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to calculate when to refresh the token (5 minutes before expiry)
  const calculateRefreshTime = () => {
    // Access token expires in 30 minutes, refresh 5 minutes before expiry
    return (30 - 5) * 60 * 1000; // 25 minutes in milliseconds
  };

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

      const { accessToken } = response.data.data;

      // Store new token with expiration time
      Cookies.set("accessToken", accessToken, { expires: 30 / 1440, secure: true, sameSite: "Strict" });
      setToken(accessToken);
      setIsAuthenticated(true);

      // Schedule the next token refresh
      scheduleTokenRefresh();

      return accessToken;
    } catch (error) {
      console.error("Token refresh failed", error);
      logout();
      return null;
    }
  };

  // Function to schedule token refresh
  const scheduleTokenRefresh = () => {
    // Clear any existing timeout
    if (tokenRefreshTimeoutRef.current) {
      clearTimeout(tokenRefreshTimeoutRef.current);
    }

    // Set a new timeout to refresh the token before it expires
    tokenRefreshTimeoutRef.current = setTimeout(() => {
      refreshAccessToken();
    }, calculateRefreshTime());
  };

  // Initialize token refresh schedule when component mounts or token changes
  useEffect(() => {
    if (token) {
      scheduleTokenRefresh();
    }

    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      if (tokenRefreshTimeoutRef.current) {
        clearTimeout(tokenRefreshTimeoutRef.current);
      }
    };
  }, [token]);

  // Axios Interceptors
  useEffect(() => {
    // Response interceptor to handle 401 errors
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // If the error is 401 (Unauthorized) and the request hasn't been retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          // Try to refresh the token
          const newToken = await refreshAccessToken();
          
          if (newToken) {
            // Update the request headers with the new token
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return axios(originalRequest);
          }
        }
        
        return Promise.reject(error);
      }
    );

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
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Login function
  const login = (newToken: string, refreshToken: string) => {
    // Convert expiration time from minutes to days
    const accessTokenExpiresInDays = 30 / 1440;
    const refreshExpiresInDays = 60 / 1440; // Refresh token expires in 1 hour
    
    Cookies.set("accessToken", newToken, { expires: accessTokenExpiresInDays, secure: true, sameSite: "Strict" });
    Cookies.set("refreshToken", refreshToken, { expires: refreshExpiresInDays, secure: true, sameSite: "Strict" }); 

    setToken(newToken);
    setIsAuthenticated(true);
    
    // Schedule token refresh when logging in
    scheduleTokenRefresh();
  };

  // Logout function
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setToken(null);
    setIsAuthenticated(false);
    
    // Clear any scheduled token refresh
    if (tokenRefreshTimeoutRef.current) {
      clearTimeout(tokenRefreshTimeoutRef.current);
      tokenRefreshTimeoutRef.current = null;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};