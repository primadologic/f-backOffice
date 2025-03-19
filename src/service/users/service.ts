import { useAuth } from "@/hooks/useAuth";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";




export const useUsers = () => {

    const { token: access } = useAuth();

    const users = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/api/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data

        },

        // staleTime: 21600000 , // Cache data for 6 hours
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        refetchInterval: 86400000, // Refetch every 1 day
        
    })

    return users
}