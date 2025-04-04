import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { EditCaseFileType, NewCaseFileType } from "@/common/Type/CaseFile/CaseFile.type";
import { toast } from "sonner";
import { useAssignInvestigatorStore, useDeleteCaseFileStore, useUpdateCaseFileStore } from "@/hooks/state/case-files/case-file-store";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";




export const useCaseFileListService = () => {

    const { token: access } = useAuth();

    const caseFileList = useQuery({
        queryKey: ['caseFile-list'],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/api/case-file`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data
        },

        // staleTime: 21600000 , // Cache data for 6 hours
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        // refetchInterval: 86400000, // Refetch every 1 day
    })

    return caseFileList

};


export const useCreateCaseFileService = () => {

    const { token: access } = useAuth();

    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const createCaseFile = useMutation({
        mutationKey: ['create-caseFile'],
        mutationFn: async (data: NewCaseFileType) => {
            const response = await axios.post(`${API_BASE_URL}/api/case-file`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data;
        },

        onSuccess: (data) => {
           const code = data?.statusCode

           if (code === 201) {
                toast.success("Case File Created successfully")
                queryClient.invalidateQueries({ queryKey: ['caseFile-list'] })
                setTimeout(() => {
                    navigate({ to: '/dashboard/case-files' })
                }, 2500)
                
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

    return createCaseFile;

}

export const useCaseFileStatusService = () => {

    const { token: access } = useAuth();

    const getCaseFileStatus = useQuery({
        queryKey: ['caseFile-status'],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/api/case-file-status`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data

        },

        staleTime: 604800000, // Cache data for 7 days
        refetchOnWindowFocus: false, // Prevent refetching on window focus
        refetchInterval: 604800000, // Refetch every 7 days
    })

    return getCaseFileStatus;
}


export const useUpdateCaseFileService = (caseId: string | undefined) => {

    const { token: access } = useAuth();

    const queryClient = useQueryClient();
    const { setIsOpen } = useUpdateCaseFileStore()

    const updateCaseFile = useMutation({
        mutationKey: ['patch-caseFile', caseId],
        mutationFn: async (formData: EditCaseFileType) => {
            const response = await axios.patch(`${API_BASE_URL}/api/case-file/${caseId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data
        },

        onSuccess: () => {
            toast.success('Updated case file successfully')
            queryClient.invalidateQueries({ queryKey: ['caseFile-list'] })
            setIsOpen(false)
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
    
    return updateCaseFile;

};


export const useRetrieveCaseFileService = (caseFileId: string) => {
    const { token: access } = useAuth();

    const retrieveCaseFile = useQuery({
        queryKey: ['retrieve-caseFile', caseFileId],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/api/case-file/${caseFileId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data
        },

        enabled: !!caseFileId

    });

    return retrieveCaseFile;

};


export const useDeletCaseFileService = (caseFileId: string) => {

    const { token: access } = useAuth();

    const queryClient = useQueryClient();

    const { setIsOpen } = useDeleteCaseFileStore();

    const deleteCaseFile = useMutation({
        mutationKey: ['delete-caseFile', caseFileId],
        mutationFn: async (caseFileId: string) => {
            const response = await axios.delete(`${API_BASE_URL}/api/case-file/${caseFileId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data
        },

        onSuccess: (data) => {
            const message = data?.message
            if (data?.statusCode === 204) {
                toast.success(`${message}`)
                queryClient.invalidateQueries({ queryKey: ['caseFile-list'] })
                setIsOpen(false)
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
                            toast.error(`Sorry, this case file does not exist.`, {
                                description: `${error.response?.data?.message}`
                            });
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
    });

    return deleteCaseFile;

};


export const useAssignInvestigatorService = (caseFileId: string) => {

    const { token: access } = useAuth();

    const { setIsOpen } = useAssignInvestigatorStore()
    const queryClient = useQueryClient()

    const assignInvestigator = useMutation({
        mutationKey: ['assign-caseFile', caseFileId],
        mutationFn: async (investigatorId: string) => {
            const response = await axios.patch(`${API_BASE_URL}/api/case-file/assign/investigator/${caseFileId}`, {
                "investigatorId": investigatorId
            } , {
                    
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ access }`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

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
    });

    return assignInvestigator;

}

