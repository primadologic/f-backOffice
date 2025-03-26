import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useForm } from "react-hook-form"
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
import { useCallback, useState } from "react";
import { CloudUpload, X } from "lucide-react";
import { useAccountAvatarStore } from "@/hooks/state/account/account.state";


type AvatarURLType = {
    avatarUrl?: File | null; // Assuming the binary data will be handled as a File
}

export default function UpdateAvatarDialog() {
    const { token: access } = useAuth();
  
    const {
      handleSubmit,
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

    const {isOpen, selectedUser, setIsOpen} = useAccountAvatarStore();


        // File and File Validation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [files, setFiles] = useState<File[]>([]);
    const [preview, setPreview] = useState<string | null>(null)

    const { 
        getRootProps, 
        getInputProps, 
        open,
        isDragActive 
      } = useDropzone({
        multiple: false,
        accept: {
          'image/*': ['.jpeg', '.png', '.gif', '.jpg']
        },
        maxSize: 5 * 1024 * 1024, // 5MB
        noClick: true, // Prevent automatic click
        onDrop: useCallback((acceptedFiles: File[]) => {
          if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            
            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
    
            setFiles([file]);
            setValue('avatarUrl', file, { shouldValidate: true });
          }
        }, []),
        onDropRejected: (fileRejections) => {
          const errors = fileRejections.map(rejection => 
            `${rejection.file.name}: ${rejection.errors[0].message}`
          );
          console.error('File Rejected:', errors);
        }
      });
    
      const removeFile = () => {
        setFiles([]);
        setPreview(null);
        setValue('avatarUrl', null, { shouldValidate: true });
      };
    
      const handleBrowseClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent any default behavior
        open(); // Open file selection
      };
    

    const updateAvatarMutation = useMutation({
        mutationKey: ['update-avatar', selectedUser],
        mutationFn: async (newAvater: AvatarURLType) => {
            try {

                const formData = new FormData();

                // Ensure that newAvatar is Valid is valid File before appending
                if (newAvater.avatarUrl instanceof File) {
                    formData.append("avatarUrl", newAvater.avatarUrl)
                }

                const response = await axios.put(`${API_BASE_URL}/api/users/${selectedUser}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "X-API-KEY": `${API_KEY}`,
                        Authorization: `Bearer ${access}`
                    }
                });
    
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

        onSuccess: (data) => {
            if (data?.statusCode === 204) {
                toast.success(`Your profile avatar image has been uploaded.`, {
                    duration: 4000
                });

                queryClient.invalidateQueries({ queryKey: [['users'], ['currentUser']] })
            }

            if (data?.statusCode === 201) {
                toast.success(`${data?.message}`, {
                    duration: 4000
                });
            };

            setFiles([]);
            setIsOpen(false);
            navigate({ to: '/accounts' });
        },
    });


    const onSubmit = (data: AvatarURLType) => {
        if (!data.avatarUrl) {
            toast.error("Please select an avatar.");
            return;
        }
        updateAvatarMutation.mutateAsync(data);
    };


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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex flex-col gap-2">
                            <label htmlFor="incident_date"  className="form-label">User Profile Picture</label>
                            <div className="flex flex-col gap-4">
                                {preview ? (
                                    <div className="relative w-48 h-48">
                                    <img 
                                        src={preview} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover rounded-lg shadow-md"
                                    />
                                    <button 
                                        onClick={removeFile} 
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    </div>
                                ) : (
                                    <div 
                                    {...getRootProps({ 
                                        className: `dropzone ${isDragActive ? 'border-blue-500' : 'border-gray-300'} 
                                        border-2 border-dashed rounded-lg p-6 text-center`
                                    })}
                                    >
                                    <input {...getInputProps()} />
                                    <div className="flex flex-col items-center gap-3">
                                        <CloudUpload className="w-12 h-12 text-gray-400" />
                                        <p className="text-sm">
                                        {isDragActive 
                                            ? 'Drop the files here ...' 
                                            : 'Drag and drop an image, or click to select'}
                                        </p>
                                        <Button 
                                        type="button" 
                                        onClick={handleBrowseClick}
                                        className="btn-dark-mode"
                                        >
                                        Browse
                                        </Button>
                                    </div>
                                    </div>
                                )}

                                {errors.avatarUrl && <p className="form-error-msg">{errors.avatarUrl.message}</p>}
                                </div>
                        </div>
                        <div className="w-full flex sm:flex-row gap-x-6 gap-y-3 py-6 flex-col-reverse">
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
                                    <span>Upload</span>
                                )}
                            </Button>
                        </div>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
};