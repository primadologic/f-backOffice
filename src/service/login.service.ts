import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { useRouter } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { LoginUserType } from "@/common/Type/auth.type";
import { toast } from "sonner";



export const useLoginService = () => {

    const { login } = useAuth();
    const router = useRouter();

    const loginMutation = useMutation({
        mutationKey: ['loginService'],
        mutationFn: async (credentials: LoginUserType) => {
            const response = await axios.post(`${API_BASE_URL}/api/auth/user/login`, credentials, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data
        },

        onSuccess: (data) => {
            const { accessToken, refreshToken } = data.data;

            login(accessToken, refreshToken);
            router.navigate({ to: '/dashboard' })
            toast.success('Logged in successfully', {
                description: "Welcome back"
            })
        },
        onError: (error) => {
            console.log("Login failed", error);
            if (axios.isAxiosError(error)) {
                const code = error.response?.status ?? null;
                // const _code = error.response?.data?.status ?? null;

                if (code === 201 ) {
                    toast.success(`${error.response?.data?.message}`);
                };
                if (code === 401 ) {
                    toast.error(`${error.response?.data?.message}`);
                };
                if (code === 404) {
                    toast.error(`${error.response?.data?.message}`);
                } 

            }
        }
    })

    return loginMutation;

}