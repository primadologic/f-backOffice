import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { useAuth } from "@/hooks/useAuth";



export const useFraudNumberListService = () => {
    
    const { token: access } = useAuth();

    const fraudNumberList = useQuery({
        queryKey: ['report-list'],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/api/fraud-number`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data

        },

        staleTime: 21600000, // Cache data for 6 hours
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        refetchInterval: 86400000, // Refetch every 1 day
        
    })

    return fraudNumberList

}


export const useRetrieveFraudNumber = (fraudNumberId: string) => {
    const { token: access } = useAuth();

    const retrieveFraudNumber = useQuery({
        queryKey: ['retrieve-caseFile', fraudNumberId],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/api/fraud-number/${fraudNumberId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data
        },
    });

    return retrieveFraudNumber;

};


export const use
