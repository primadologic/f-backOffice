import { CreateUserRoleType } from "@/common/Type/UserRole.type";
import { useUserRoleDeleteStore, useUserRoleStore } from "@/hooks/state/users/role.state";
import { useDeleteUserStore } from "@/hooks/state/users/user.state";
import { useAuth } from "@/hooks/useAuth";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
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
        queryKey: ['get-user', userId],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ access }`,
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


export const useGetUserDetails = (userId: string) => {
    const { token: access } = useAuth();

    console.log("Fetching user details for userId:", userId); // Debugging log

    const userDetail = useQuery({
        queryKey: ['user-details', userId],
        queryFn: async () => {
            if (!userId || userId === "defaultUserId") return null; // Avoid invalid API calls

            const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data;
        },

        enabled: !!userId && userId !== "defaultUserId", // Prevent fetching when userId is default
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        refetchOnMount: true, // Ensure fresh data on mount
        refetchOnWindowFocus: false,
    });

    return userDetail;
}

export const useUpdateUserService = (userId: string) => {
    const { token: access, logout,  } = useAuth();
    
    const { setIsOpen } = useUserRoleStore()

    const queryClient = useQueryClient();

    const updateUser = useMutation({
        mutationKey: ['update-user', userId],
        mutationFn: async () => {
            const response = await axios.put(`${API_BASE_URL}/api/users/${userId}`, {
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
            if (data?.statusCode === 200) {
                toast.success(`${message}`)
                queryClient.invalidateQueries({ queryKey: ['users', userId] })
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
                    toast.error(`Sorry, this user does not exist.`, {
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

    return updateUser;
}



export const useDeleteUserService = (userId: string) => {
    const { token: access  } = useAuth();
    const { setIsOpen } = useDeleteUserStore();

    const queryClient = useQueryClient();

    const deleteUser = useMutation({
        mutationKey: ['delete-user', userId],
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
            if (data?.statusCode === 200) {
                toast.success(`${message}`)
                queryClient.invalidateQueries({ queryKey: ['users', userId] })
                setIsOpen(false)
                // logout();
    
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
                    toast.error(`Sorry, this user does not exist.`, {
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



// User Roles Service Hooks


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


export const useUpdateUserRoleService = (roleId: string) => {
    const { token: access,  } = useAuth();
    

    const queryClient = useQueryClient();

    const updateUserRole = useMutation({
        mutationKey: ['update-user-role', roleId],
        mutationFn: async () => {
            const response = await axios.put(`${API_BASE_URL}/api/roles/${roleId}`, {
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
            if (data?.statusCode === 200) {
                toast.success(`${message}`)
                queryClient.invalidateQueries({ queryKey: ['user-role', roleId] })
    
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
                    toast.error(`Sorry, this user role does not exist.`, {
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

    return updateUserRole;
}


export const useCreateUserRoleService = () => {
    const { token: access,  } = useAuth();

    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const createUserRole = useMutation({
        mutationKey: ['create-user-role'],
        mutationFn: async (roleData: CreateUserRoleType) => {
            const response = await axios.post(`${API_BASE_URL}/api/roles`, roleData, {
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
            if (data?.statusCode === 201) {
                toast.success(`${message}`)
                queryClient.invalidateQueries({ queryKey: ['user-role'] })
                navigate({ to: '/user-role' })
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
                    toast.error(`Sorry, this user role does not exist.`, {
                        description: `${error.response?.data?.message}`
                    })
                };
                if (code === 500) {
                    toast.error(`Sorry an unexpected error occured.`, {
                        description: `${error.response?.data?.message}`
                    })
                };
                if (code === 409) {
                    toast.error(`${error.response?.data?.message}`)
                };
            }
        },
        
    })

    return createUserRole;
}


export const useUserRoleDetailService = (roleId: string) => {

    const { token: access } = useAuth();

    const userRoleDetail = useQuery({
        queryKey: ['role-details', roleId],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/api/roles/${roleId}`, {
                headers: {
                    'Content-Typpe': 'application/json',
                    'Authorization': `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data

        },

        enabled: !!roleId,
        // staleTime: 21600000 , // Cache data for 6 hours
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        refetchInterval: 86400000, // Refetch every 1 day
        
    })

    return userRoleDetail;
}


export const useDeleteUserRoleService = (roleId: string) => {
    const { token: access } = useAuth();
    const { setIsOpen } = useUserRoleDeleteStore();

    const queryClient = useQueryClient();

  
    const deleteUserRole = useMutation({
        mutationKey: ['delete-user-role', roleId],
        mutationFn: async () => {
            const response = await axios.delete(`${API_BASE_URL}/api/roles/${roleId}`, {
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
            if (data?.statusCode === 200) {
                toast.success(`${message}`)
                queryClient.invalidateQueries({ queryKey: ['user-role'] })
                setIsOpen(false)
    
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
                    toast.error(`Sorry, this user role does not exist.`, {
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

    return deleteUserRole;
}
