import { AuthContext } from "@/components/providers/auth-context";
import { useContext } from "react";



// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};