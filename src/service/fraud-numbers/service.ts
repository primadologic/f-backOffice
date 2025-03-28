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
                    Authorization: `Bearer ${ access }`,
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


export const useDeleteFraudNumberService = (fraudNumberId: string) => {

    const { setIsOpen } = useDeleteFraudNumberStore()

    const { token: access } = useAuth();
    const queryClient = useQueryClient()

    const deleteFraudNumber = useMutation({
        mutationKey: ['delete-fraudNumber', fraudNumberId],
        mutationFn: async (fraudNumberId: string) => {
            const response = await axios.delete(`${API_BASE_URL}/api/fraud-number/${fraudNumberId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });
            // console.log("delete fraud number", response.data);
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
                if (error.code === "ERR_NETWORK") {
                    toast.error("Network error. Please check your internet connection.");
                } else if (error.code === "ECONNABORTED") {
                    toast.error("Request timed out. Please try again.");
                } else if (error.code === "ECONNREFUSED") {
                    toast.error("Connection refused. Please try again later.");
                } else if(error.code === "ENOTFOUND") {
                    toast.error("Server not found, please check your url.");
                } else {
                    const code = error.response?.status ?? null;
        
                    switch (code) {
                        case 400:
                            toast.error(`${error.response?.data?.message}`);
                            break;
                        case 401:
                            toast.error(`${error.response?.data?.message}`);
                            break;
                        case 403:
                            toast.error(`${error.response?.data?.message}`)
                            break;
                        case 404:
                            toast.error(`${error.response?.data?.message}`)
                            break;
                        case 500:
                            toast.error(`Sorry an unexpected error occured.`, {
                                description: `${error.response?.data?.message}`
                            });
                            break;
                        default:
                            toast.info("An unexpected error occurred, please try again.");
                    }
                }
            } else {
                toast.error("An unexpected error occurred."); // handle non-axios errors
            };
        }
    })

    return deleteFraudNumber;

    
}
