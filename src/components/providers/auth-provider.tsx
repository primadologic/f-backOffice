import React, { useState } from 'react';
import { AuthContext } from './auth-context';
import Cookies from "js-cookie";

// Authentication Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(Cookies.get("access") ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  // Login function
  const login = (newToken: string, refreshToken: string) => {
    Cookies.set("access", newToken, { expires: 30 / 1440, secure: true, sameSite: "Strict" });
    Cookies.set("refresh", refreshToken, { expires: 60 / 1440, secure: true, sameSite: "Strict" }); 

    setToken(newToken);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
