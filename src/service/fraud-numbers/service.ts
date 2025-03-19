import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useDeleteFraudNumberStore } from "@/hooks/state/fraud-numbers/fraudSheet.state";



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


export const useDeleteFraudNumberService = () => {

    const { setIsOpen } = useDeleteFraudNumberStore()

    const { token: access } = useAuth();
    const queryClient = useQueryClient()

    const deleteFraudNumber = useMutation({
        mutationKey: ['delete-fraudNumber'],
        mutationFn: async (fraudNumberId: string) => {
            const response = await axios.delete(`${API_BASE_URL}/api/fraud-number/${fraudNumberId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });
            console.log("delete fraud number", response.data);
            return response.data
        },
        onSuccess: (data) => {
            const message = data?.message
            if (data?.statusCode === 204) {
                toast.success(`${message}`)
                setIsOpen(false)
                queryClient.invalidateQueries({ queryKey: ['caseFile-list'] })
                
            }
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const code = error.response?.status ?? null

                if (code === 400) {
                    toast.error(`Oops an error occured`, {
                        description: `${error.response?.data?.message}`
                    })
                };
                if (code === 401) {
                    toast.error(`Oops an error occured`, {
                        description: `${error.response?.data?.message}`
                    })
                };

                if (code === 404) {
                    toast.error(`Sorry, this fraud number does not exist.`, {
                        description: `${error.response?.data?.message}`
                    })
                };
                if (code === 403) {
                    toast.error(`Sorry, you cannot delete this fraud number`, {
                        description: `${error.response?.data?.message}`
                    })
                };
                if (code === 500) {
                    toast.error(`Sorry an unexpected error occured.`, {
                        description: `${error.response?.data?.message}`
                    })
                };
            }
        }
    })

    return deleteFraudNumber;

    
}
