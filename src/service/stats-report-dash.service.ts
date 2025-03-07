import { API_BASE_URL, API_KEY } from "@/lib/env_vars"
import { accessToken } from "@/lib/tokens"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export const useStatReportDashboard = () => {

    const getStatsReportDashboard = useQuery({
        queryKey: ['stats-report-dashboard'],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/statistics/report/dashboard`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': `${API_KEY}`,
                    'Authorization': `${accessToken}`
                }
            })

            return response.data
        },
        
    })

    return getStatsReportDashboard;
}