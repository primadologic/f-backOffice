import { CustomCloseButton } from "@/components/custom-ui/custom-buttons";
import Loader from "@/components/custom-ui/loader";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { useAccountInfoStore } from "@/hooks/state/account/account.state"
import { useAuth } from "@/hooks/useAuth";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { useCurrentUser } from "@/service/accounts/fetchCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


type UpdateInfoType = {
    firstName: string;
    lastName: string;
}


export default function AccountInfoDialog() {

    const { isOpen, setIsOpen, selectedUser } = useAccountInfoStore();

    const fetchCurrentUser = useCurrentUser();

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateInfoType>({
        defaultValues: {
            firstName: fetchCurrentUser.data?.data?.firstName,
            lastName: fetchCurrentUser.data?.data?.lastName
        },
        mode: 'onChange'
    })

    const { token: access, logout } = useAuth();
    const queryClient = useQueryClient();

    const updateInfoMutation = useMutation({
        mutationKey: ['update-info', selectedUser],
        mutationFn: async (newData: UpdateInfoType) => {
            const response = await axios.put(`${API_BASE_URL}/api/users/${selectedUser}`, newData, {
                headers: {
                    'content-type': "application/json",
                    Authorization: `Bearer ${access}`,
                    'X-API-KEY': `${API_KEY}`
                }
            })

            return response.data
        },

        onSuccess: (data) => {
            const { statusCode } = data;
            if (statusCode === 204) {
                toast.success('Profile info updated successfully')
                queryClient.invalidateQueries({ queryKey: [['users'], ['currentUser']] })
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
                            logout();
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


    const onSubmit = (data: UpdateInfoType) => {
        console.log("Profile data", data);
        updateInfoMutation.mutateAsync(data)
    }


    return (
        <div className="py-3">
        <AlertDialog
           open={isOpen}
           onOpenChange={setIsOpen}
       >
           <AlertDialogTrigger className="sr-only">
               Update Profile Avator
           </AlertDialogTrigger>
           <AlertDialogContent className="">
               <AlertDialogHeader className="w-full flex flex-col space-y-1 !justify-start !items-start">
                   <AlertDialogTitle className="text-left">Update Profile Avator</AlertDialogTitle>
                   <AlertDialogDescription className="text-left space-y-2">
                      Upload a new profile avatar to personalize your account.
                   </AlertDialogDescription>
               </AlertDialogHeader>
                
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="first-name" className="form-label">First Name</label>
                                <input 
                                    type="text" 
                                    placeholder="First Name"
                                    className={`form-input
                                            ${errors.firstName ? "form-validerr-ring" : "form-valid-ring"}
                                        `} 
                                    {...register('firstName', {
                                        required: {
                                            value: true,
                                            message: "First name is required"
                                        },
                                    })}
                                />
                                {errors.firstName && <p className="form-error-msg">{errors.firstName?.message}</p>}
                            </div>
                            <div className="w-full flex flex-col gap-2 ">
                                <label htmlFor="last-name" className="form-label">Last Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Last Name"
                                    className={`form-input
                                            ${errors.lastName ? "form-validerr-ring" : "form-valid-ring"}
                                        `} 
                                    {...register("lastName", {
                                        required: {
                                            value: true,
                                            message: "Last name is required"
                                        },
                                    })}
                                />
                                {errors.lastName && <p className="form-error-msg">{errors.lastName?.message}</p>}
                            </div>
                        </div>
                        <div className="w-full flex sm:flex-row gap-x-6 gap-y-3 py-6 flex-col-reverse">
                            <CustomCloseButton />
                            <Button
                                type="submit"
                                // onClick={deleteHandler}
                                className={`btn-default sm:min-w-[6.25rem]  ${
                                    updateInfoMutation.isPending ? "sm:min-w-[6.25rem]" : "sm:max-w-max w-full"
                                }`}
                            >
                                {updateInfoMutation.isPending ? (
                                    <span className="flex items-center justify-center sm:w-[6.25rem]"> 
                                        {/* Ensure the span has the desired width */}
                                        <Loader />
                                    </span>
                                ) : (
                                    <span>Save Changes</span>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
               
           </AlertDialogContent>
       </AlertDialog>
   </div>
    )
    
};
