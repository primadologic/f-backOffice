import { API_BASE_URL, API_KEY } from "@/lib/env_vars"
import { accessToken } from "@/lib/tokens"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"




export const useYearlyStatistics = (selectedYear: number) => {

    // 1 day = 24 * 60 * 60 * 1000 = 86,400,000 ms  // Stale time for 1 day

    const yearStatistics = useQuery({
        queryKey: ['yearly-statistics', selectedYear],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}//statistics/yearly`, {
                params: {
                    year: selectedYear
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': `${API_KEY}`,
                    'Authorization': `Bearer ${accessToken}`
                }
            })

            return response.data
        },

        staleTime: 86400000, // Cache data for 1 day
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        refetchInterval: 86400000, // Refetch every 1 day

    })

    return yearStatistics;
}