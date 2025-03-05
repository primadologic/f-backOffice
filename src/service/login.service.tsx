import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "@/lib/env_vars";
import { useRouter } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { LoginUserType } from "@/common/Type/auth.type";
import { toast } from "sonner";
import Cookies from "js-cookie";



export const useLoginService = () => {

    const { login } = useAuth();
    const router = useRouter();

    const loginMutation = useMutation({
        mutationKey: ['loginService'],
        mutationFn: async (credentials: LoginUserType) => {
            const response = await axios.post(`${API_BASE_URL}/auth/user/login`, credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data
        },

        onSuccess: (data) => {
            const { accessToken, refreshToken } = data.data;

            login(accessToken);
            Cookies.set('refreshToken', refreshToken,  {secure: true, sameSite: 'Strict'})
            router.navigate({ to: '/dashboard' })
        },
        onError: (error) => {
            console.log("Login failed", error);
            if (axios.isAxiosError(error)) {
                const code = error.response?.status ?? null;
                const _code = error.response?.data?.status ?? null;

                if (code === 201 && _code === 201) {
                    toast.success(`${error.response?.data?.message}`);
                };
                if (code === 401 && _code === 401) {
                    toast.error(`${error.response?.data?.message}`);
                };
                if (code === 404 && _code === 404) {
                    toast.error(`${error.response?.data?.message}`);
                } 

            }
        }
    })

    return loginMutation;

}