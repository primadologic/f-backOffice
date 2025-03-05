

 // Define the shape of our authentication context
 
 export interface AuthContextType {
  isAuthenticated: boolean;
  login: (newToken: string, refreshToken: string) => void;
  logout: () => void;
  token: string | null;
}

export type LoginUserType = {
  email: string;
  password: string
}