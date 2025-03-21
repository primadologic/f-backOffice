import { AuthContextType } from '@/common/Type/auth.type';
import { createContext } from 'react';


export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  token: null,
});