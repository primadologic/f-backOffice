import { useDeleteUserStore } from "@/hooks/state/users/user.state";
import { useAuth } from "@/hooks/useAuth";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";




export const useUsers = () => {

    const { token: access } = useAuth();

    const users = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/api/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data

        },

        // staleTime: 21600000 , // Cache data for 6 hours
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        refetchInterval: 86400000, // Refetch every 1 day
        
    })

    return users
}


export const useGetUserService = (userId: string) => {

    const { token: access } = useAuth();

    const user = useQuery({
        queryKey: ['get-users', userId],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data

        },

        enabled: !!userId,
        // staleTime: 21600000 , // Cache data for 6 hours
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        refetchInterval: 86400000, // Refetch every 1 day
        
    })

    return user;
}

export const useDeleteUserService = (userId: string) => {
    const { token: access, logout,  } = useAuth();
    const { setIsOpen } = useDeleteUserStore();

    const queryClient = useQueryClient();

    const deleteUser = useMutation({
        mutationKey: ['delete-user'],
        mutationFn: async () => {
            const response = await axios.delete(`${API_BASE_URL}/api/users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            })

            return response.data
        },
        onSuccess: (data) => {
            const message = data?.message
            if (data?.statusCode === 204) {
                toast.success(`${message}`)
                queryClient.invalidateQueries({ queryKey: ['users'] })
                setIsOpen(false)
                logout();
    
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
                    toast.error(`Sorry, this case file does not exist.`, {
                        description: `${error.response?.data?.message}`
                    })
                };
                if (code === 500) {
                    toast.error(`Sorry an unexpected error occured.`, {
                        description: `${error.response?.data?.message}`
                    })
                };
            }
        },
        
    })

    return deleteUser;
}


export const useUserRoleService = () => {

    const { token: access } = useAuth();



    const userRole = useQuery({
        queryKey: ['user-role'],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/api/roles`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data
        },

        // staleTime: 21600000 , // Cache data for 6 hours
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        refetchInterval: 86400000, // Refetch every 1 day
        
    })

    return userRole

}