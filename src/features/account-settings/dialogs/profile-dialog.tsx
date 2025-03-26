import {
    AlertDialog,
    AlertDialogContent,
    // AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import Loader from "@/components/custom-ui/loader";
import { useAuth } from "@/hooks/useAuth";
import { CustomCloseButton } from "@/components/custom-ui/custom-buttons"
import { useDropzone } from 'react-dropzone';
import { useState } from "react";
import { CloudUpload, X } from "lucide-react";
import { useAccountAvatarStore } from "@/hooks/state/account/account.state";


type AvatarURLType = {
    avatarUrl?: File | null; // Assuming the binary data will be handled as a File
}

export default function UpdateAvatarDialog() {
    const { token: access } = useAuth();

    const { selectedUser } = useAccountAvatarStore()
  
    const {
      handleSubmit,
      trigger,
      control,
      setValue,
      reset,
      formState: { errors },
    } = useForm<AvatarURLType>({
      defaultValues: {
        avatarUrl: null
      },
      criteriaMode: "firstError",
    });
  
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {isOpen, setIsOpen} = useAccountAvatarStore();


        // File and File Validation
    const [files, setFiles] = useState<File[]>([]);
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: (acceptedFile: File[]) => {
          if (acceptedFile.length > 0) {
            const file = acceptedFile[0]; // Only take the first file
            setFiles([file]);
            setValue('avatarUrl', file, { shouldValidate: true })
          }
        },
      });
    
    const removeFile = () => {
      setFiles([]);
      setValue('avatarUrl', null, { shouldValidate: true }); // Reset field
      trigger('avatarUrl');
    };


    const validateFileSize = (file: File | null | undefined): boolean | string => {
        if (!file) return true;
        
        return file.size > 5_000_000 ? "File size exceeds the limit of 5 MB." : true;
    };
    

    const updateAvatarMutation = useMutation({
        mutationKey: ['update-user', selectedUser],
        mutationFn: async (newData: AvatarURLType) => {
            try {
                const formData = new FormData();

                // Append file (Only one allowed)
                if (newData.avatarUrl && newData.avatarUrl instanceof File) {
                    formData.append('avatarUrl', newData.avatarUrl);
                }

                const response = await axios.put(`${API_BASE_URL}/api/users/${selectedUser}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "X-API-KEY": `${API_KEY}`,
                        'Authorization': `Bearer ${access}`
                    }
                });
    
                if (response.data?.statusCode === 204) {
                    toast.success(`${response?.data?.message}`, {
                        duration: 4000
                    });

                    queryClient.invalidateQueries({ queryKey: [['users'], ['currentUser']] })
                    navigate({ to: '/users' });
                }
    
                if (response.data?.statusCode === 201) {
                    toast.success(`${response?.data?.message}`, {
                        duration: 4000
                    });
                }
    
                return response.data;
    
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    const code = err.response?.data?.statusCode ?? null;
                    
                    if (code === 409) {
                        toast.info(`${err.response?.data?.message} `, {
                            duration: 5000
                        });
                    }

                    if (code === 400) {
                        toast.error(`${err.response?.data?.message}`, {
                            duration: 5000
                        });
                    }

                    if (code === 500) {
                        toast.error(`${err.response?.data?.message}`, {
                            duration: 5000
                        });
                    }

                    if (code === 401) {
                        toast.error(`${err.response?.data?.message}`);
                        reset();
                        setTimeout(() => {
                            navigate({ to: '/' });
                        }, 4000);
                    }
                }
                throw err;
            }
        },
    });

  

    const onSubmit = (data: AvatarURLType) => {
        updateAvatarMutation.mutateAsync(data)
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
                        {/* <AlertDialogDescription className="text-left space-y-2">
                          
                        </AlertDialogDescription> */}
                    </AlertDialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex flex-col gap-2">
                            <label htmlFor="incident_date"  className="form-label">User Profile Picture</label>
                            <div className="flex flex-col gap-2">
                                <Controller
                                    name="avatarUrl"
                                    control={control}
                                    rules={{ required: 'This field is required', validate: validateFileSize }}
                                    render={() => (
                                        <>
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()} 
                                                    className={`form-input
                                                        ${errors.avatarUrl ? "form-validerr-ring" : "form-valid-err"}
                                                    `}
                                                />
                                                <div className="form-input-file hover: flex flex-col items-center gap-3 px-10 py-8">
                                                    <div className="dark:bg-[#2d2738] bg-[#d5c1ff] text-[#712eff] w-12 h-12 flex justify-center items-center text-center rounded-full">
                                                        <CloudUpload className="" />
                                                    </div>
                                                    <div className="text-center space-y-2">
                                                        <div className="text-sm">
                                                            Drag and drop a file here, or click to select a file
                                                        </div>
                                                        <p className="text-custom_theme-primary_foreground dark:text-custom_theme-gray">
                                                            File size is limited to 5MB
                                                        </p>
                                                        <Button type="button" className="btn-dark-mode bg-custom_theme-light_blue hover:bg-custom_theme-light_blue/95">Browse</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.avatarUrl && (
                                                <span className="form-error-msg">{errors.avatarUrl.message}</span>
                                            )}
                                            {files.length > 0 && (
                                                <aside className="flex flex-col gap-2 max-w-max ">
                                                    <ul className="space-y-3 list-disc ">
                                                        {files.map((file) => (
                                                            <div key={file.name} className="flex flex-row gap-2">
                                                                <li className="bg-white w-full px-3 line-clamp-1 text-black text-base font-medium py-1 rounded-xl flex items-center justify-between">
                                                                    {file.name}
                                                                </li>
                                                                <button onClick={removeFile} className="ml-2 text-red-500">
                                                                    <X className="w-6 h-6 bg-white text-black rounded-full hover:bg-red-500 focus:bg-red-500 hover:text-white hover:font-bold transition-all duration-300 hover:scale-125 hover:translate-y-1" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                </aside>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    
                        <div className="w-full flex sm:flex-row gap-x-6 gap-y-3 py-3 flex-col-reverse">
                            <CustomCloseButton />
                            <Button
                                type="submit"
                                // onClick={deleteHandler}
                                className={`btn-default sm:min-w-[6.25rem]  ${
                                    updateAvatarMutation.isPending ? "sm:min-w-[6.25rem]" : "sm:max-w-max w-full"
                                }`}
                            >
                                {updateAvatarMutation.isPending ? (
                                    <span className="flex items-center justify-center sm:w-[6.25rem]"> 
                                        {/* Ensure the span has the desired width */}
                                        <Loader />
                                    </span>
                                ) : (
                                    <span>Confirm</span>
                                )}
                            </Button>
                        </div>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
       </div>
    )
};