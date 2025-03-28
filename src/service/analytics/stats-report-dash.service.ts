import { useAuth } from "@/hooks/useAuth";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export const useStatReportDashboard = () => {

    const { token: access } = useAuth();

    const getStatsReportDashboard = useQuery({
        queryKey: ['stats-report-dashboard'],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/api/statistics/report/dashboard`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': `${API_KEY}`,
                    Authorization: `Bearer ${ access }`
                }
            })

            return response.data
        },
        
    })

    return getStatsReportDashboard;
}