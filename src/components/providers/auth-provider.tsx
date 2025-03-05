import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './auth-context';
import { API_BASE_URL, API_KEY } from '@/lib/env_vars';
import Cookies from "js-cookie"

// Create the context with a default value


// Authentication Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(Cookies.get("accessToken") ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  // Setup axios interceptors
  useEffect(() => {
    // Request interceptor to add token to every request
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
          config.headers['X-API-KEY'] = ` ${API_KEY}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Call your refresh token endpoint
            const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh/token`, {
              // refreshToken: localStorage.getItem('refreshToken')
              refreshToken: Cookies.get('refreshToken')
            });

            const { accessToken } = refreshResponse.data;

            // Update token in local storage and state
            // localStorage.setItem('token', accessToken);
            Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'Strict' });
            setToken(accessToken);

            // Retry the original request with new token
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            // If refresh fails, log out the user
            logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  // Login function to set token and authentication state
  const login = (newToken: string) => {
    // localStorage.setItem('token', newToken);
    Cookies.set("accessToken", newToken, {secure: true, sameSite: 'Strict'})
    setToken(newToken);
    setIsAuthenticated(true);
  };

  // Logout function to clear token and authentication state
  const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('refreshToken');
    Cookies.remove("accessToken")
    Cookies.remove("refreshToken")
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      token 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

