import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { accessToken } from "@/lib/tokens";
import { EditCaseFileType } from "@/common/Type/CaseFile/CaseFile.type";
import { toast } from "sonner";



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

    return getCaseFileStatus;
}

export const useUpdateCaseFileService = (caseId: string | undefined) => {

    const queryClient = useQueryClient()

    const updateCaseFile = useMutation({
        mutationKey: ['patch-case-file', caseId],
        mutationFn: async (formData: EditCaseFileType) => {
            const response = await axios.patch(`${API_BASE_URL}/case-file/${caseId}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data
        },

        onSuccess: () => {
            toast.success('Updated case file successfully')
            queryClient.invalidateQueries({ queryKey: ['case-file-list'] })
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
            }
        }
    })
    
    return updateCaseFile;

}


export const useRetrieveCaseFileService = (caseFileId: string | undefined) => {

    const retrieveCaseFile = useMutation({
        mutationKey: ['retrieve-case-file', caseFileId],
        mutationFn: async (caseFileId: string) => {
            const response = await axios.get(`${API_BASE_URL}/case-file/${caseFileId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data
        },

        onSuccess: (data) => {
            const code = data?.statusCode ?? null
            const message = data?.message
            if (code === 204) {
                toast.success(`${message}`)
            }

            if (code === 404) {
                toast.success(`${message}`)
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
            }
        }
    });

    return retrieveCaseFile;

}


export const useDeletCaseFileService = (caseFileId: string | undefined) => {

    const deleteCaseFile = useMutation({
        mutationKey: ['delete-case-file', caseFileId],
        mutationFn: async (caseFileId: string) => {
            const response = await axios.delete(`${API_BASE_URL}/case-file/${caseFileId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'X-API-KEY': `${API_KEY}`
                }
            });

            return response.data
        },

        onSuccess: (data) => {
            const message = data?.message
            if (data?.statusCode === 204) {
                toast.success(`${message}`)
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
            }
        }
    });

    return deleteCaseFile;

}