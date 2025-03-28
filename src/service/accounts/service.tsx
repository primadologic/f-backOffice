import { ChangePasswordType } from "@/common/Type/accounts-settings.type"
import { useAuth } from "@/hooks/useAuth"
import { API_BASE_URL, API_KEY } from "@/lib/env_vars"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"



export const useChangePasswordService = () => {

    const { token: access, logout } = useAuth();

    const changePassword = useMutation({
        mutationKey: ['change-password'],
        mutationFn: async (data: ChangePasswordType) => {
            const response = await axios.post(`${API_BASE_URL}/api/auth/user/change/current-password`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            })

            return response.data
        },

        onSuccess: (data) => {
            const { statusCode, message } = data;
            if (statusCode === 200) {
                toast.success(`${message}`)
                setTimeout(() => {
                    logout();
                }, 1500)
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
                        case 500:
                            toast.error(`${error.response?.data?.message}`);
                            break;
                        default:
                            toast.info("An unexpected error occurred, please try again.");
                    }
                }
            } else {
                toast.error("An unexpected error occurred."); // handle non-axios errors
            }
        }
    })

    return changePassword;
}