import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { useAuth } from "@/hooks/useAuth";



export const useReportListService = () => {
    
    const { token: access } = useAuth();

    const reportList = useQuery({
        queryKey: ['report-list'],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/report`, {
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

    return reportList

}