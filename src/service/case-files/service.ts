import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { accessToken } from "@/lib/tokens";



export const useCaseFileListService = () => {

    const caseFileList = useQuery({
        queryKey: ['case-file-list'],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/case-file`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data

        },

        staleTime: 21600000 , // Cache data for 6 hours
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        refetchInterval: 86400000, // Refetch every 1 day
    })

    return caseFileList

}

export const useCaseFileStatus = () => {

    const getCaseFileStatus = useQuery({
        queryKey: ['case-file-status'],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/case-file-status`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data

        },

        staleTime: 604800000, // Cache data for 7 days
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        refetchInterval: 604800000, // Refetch every 7 days
    })

    return getCaseFileStatus
}