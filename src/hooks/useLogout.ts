import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./useAuth"
import { toast } from "sonner";



export const useLogout = () => {

   const { logout } = useAuth();
   const navigate = useNavigate();

   const handleLogout = () => {
      logout();
      navigate({ to: '/'})
      toast.success('Logged out successfully.')
   };



   return handleLogout
}