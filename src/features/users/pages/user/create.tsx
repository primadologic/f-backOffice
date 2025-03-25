
import PageLayout from "@/features/layout/PagesLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button";
import TopNavBar from "@/components/custom-ui/topBarNav";
import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { CloudUpload, UserPlus2, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import Loader from "@/components/custom-ui/loader";
import { CustomBackButton } from "@/components/custom-ui/custom-buttons";
import { CreateUserType, UserRole } from "@/common/Type/UserRole.type";
import { useAuth } from "@/hooks/useAuth";
import { useUserRoleService } from "@/service/users/service";



export default function UserCreateComponent() {

    const { token: access } = useAuth();

    const { register, handleSubmit, control, reset, setValue, trigger, formState: { errors } } = useForm<CreateUserType>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            roleId: {
                id: "",
                roleName: "",
                dateCreated: "",
                description: "",
                dateUpdated: "",
                dateDeleted: ""
            },
            avatarUrl: null
        },
        criteriaMode: "firstError"
    })

   

    // Navigation
    const navigate = useNavigate();
    
    // Get QueryClient from the context
    const queryClient = useQueryClient()

 /*    const getStartYear = () => {
        const startYear = 1900;
        return `${startYear}-12-31`;
    } */


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


    const creaateUserMutation = useMutation({
        mutationKey: ['create-user'],
        mutationFn: async (newData: CreateUserType) => {
            try {
                // const origin: string = 'Web';
                const formData = new FormData();

                // Append non-file fields
                formData.append('firstName', newData.firstName);
                formData.append('lastName', newData.lastName);
                formData.append('email', newData.email);
                formData.append('password', newData.password);
                if (newData.roleId?.id) {
                    formData.append('roleId', newData.roleId?.id);
                }

               
    
                // Append file (Only one allowed)
                // newData.avatarUrl?.forEach(file => {
                //     if (!file) return true;
                //     formData.append('requestFiles', file);
                // });

                // Append file (Only one allowed)
                if (newData.avatarUrl && newData.avatarUrl instanceof File) {
                    formData.append('avatarUrl', newData.avatarUrl);
                }

    
                // console.log("Sending request to:", `${API_BASE_URL}/report?origin=${origin}`);
                console.log("FormData entries:", Array.from(formData.entries()));
    
                const response = await axios.post(`${API_BASE_URL}/api/users`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "X-API-KEY": `${API_KEY}`,
                        'Authorization': `Bearer ${access}`
                    }
                });
    
                // console.log("Response received:", response);
    
                if (response.data?.statusCode === 200) {
                    toast.success(`${response?.data?.message}`, {
                        duration: 4000
                    });

                    queryClient.invalidateQueries({ queryKey: ['users'] })
                    
                    setTimeout(() => {
                        navigate({ to: '/' });
                    }, 1000);
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
                        toast.info(`The phone number ${err.response?.data?.message} has already been reported.`, {
                            duration: 5000
                        });
                    };

                    if (code === 400) {
                        toast.error(`${err.response?.data?.message}`, {
                            duration: 5000
                        });
                    };

                    if (code === 500) {
                        toast.error(`${err.response?.data?.message}`, {
                            duration: 5000
                        });
                    };

                    if (code === 401) {
                        toast.error("You're unauthorized, please verify your phone number.");
                        console.log("Error 401");
                        reset();
                        setFiles([]);
                        setTimeout(() => {
                            navigate({ to: '/' });
                        }, 4000);
                    }
    
                    // console.log("Error occurred while posting report:", err);
                }
                throw err; // Ensure mutation handles errors properly
            }
        },

    });



    const userRoleService = useUserRoleService()
    const userRoleData: UserRole[] = userRoleService.data?.data || [];
    
    const onSubmit = async (data: CreateUserType) => {
        creaateUserMutation.mutateAsync(data); 
    };


    return (
       <div className="py-3">
            <TopNavBar pageName="Create User" icon={UserPlus2} />
            <PageLayout>
                <div className="pt-7"/>
                 <Card className="rounded-[1.8rem] border">
                    <div className="w-full flex flex-row justify-between items-center">
                        <CardHeader className="flex flex-row justify-start items-center gap-x-5">
                            <CustomBackButton />
                          <div className="">
                            <CardTitle>User</CardTitle>
                            <CardDescription></CardDescription>
                          </div>
                        </CardHeader>
                    </div>
                    <Separator orientation="horizontal" className="-mx-1 my-1 h-px bg-muted" />
                    <CardContent className="mt-8">
                        <div className="">
                            <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full">
                                <div className="flex flex-col gap-y-5">
                                    <div className="w-full sm:flex sm:flex-row sm:gap-5 sm:justify-center sm:items-center flex flex-col gap-7">
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

                                        <div className="w-full flex flex-col gap-2 ">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input 
                                                type="email" 
                                                placeholder="Email Address"
                                                className={`form-input
                                                        ${errors.lastName ? "form-validerr-ring" : "form-valid-ring"}
                                                    `} 
                                                {...register("email", {
                                                    required: {
                                                        value: true,
                                                        message: "Email is required"
                                                    }
                                                })}
                                            />
                                            {errors.email && <p className="form-error-msg">{errors.email?.message}</p>}
                                        </div>
                                       
                                    </div>
                                    <div className="flex sm:flex-row flex-col gap-5 justify-center items-center">
                                        <div className="w-full flex flex-col gap-2 ">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input 
                                                type="password" 
                                                placeholder="Password"
                                                className={`form-input
                                                        ${errors.lastName ? "form-validerr-ring" : "form-valid-ring"}
                                                    `} 
                                                {...register("password", {
                                                    required: {
                                                        value: true,
                                                        message: "Password is required"
                                                    },
                                                    minLength: {
                                                        value: 6,
                                                        message: "Password cannot be less than 6 characters"
                                                    }
                                                })}
                                            />
                                            {errors.password && <p className="form-error-msg">{errors.password?.message}</p>}
                                        </div>

                                        <div className="w-full flex flex-col gap-2">
                                            <label htmlFor="Status"  className="form-label">User Role</label>
                                            <Controller
                                                name="roleId.id"
                                                control={control}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "Platform Id is required"
                                                    }
                                                }}
                                                render={({ field: {onBlur, value, onChange} }) => (
                                                    <Select onValueChange={onChange} defaultValue={value}>
                                                        <SelectTrigger 
                                                            onBlur={onBlur}
                                                            className={` outline-none border py-3 px-3 !w-full  text-sm font-medium text-custom_theme-primary_foreground dark:bg-custom_theme-dark_gray_1 dark:text-custom_theme-primary_background focus:ring-1 focus:ring-gray-400 dark:focus:ring-custom_theme-gray delay-150 transition ease-in-out duration-300
                                                                    ${errors.roleId?.id ? "form-validerr-ring " : "form-valid-ring"}
                                                                `}
                                                        >
                                                            <SelectValue placeholder="Select user role"  />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {userRoleService.isFetched ?  
                                                            userRoleData?.map((role) => (
                                                                <SelectItem key={role.id} value={role.id || ""}>
                                                                    {role.roleName}
                                                                </SelectItem>
                                                            )): (
                                                                <SelectItem value="no-users">no available users</SelectItem>
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            {errors.roleId?.id && <p className="form-error-msg">{errors.roleId.id?.message}</p>}
                                        </div>

                                    </div>
                                       
                            
                                   {/*  <div className="w-full flex flex-col gap-2">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea 
                                            rows={5}
                                            placeholder="Describe the fraud incident"
                                            className={`form-input
                                                    ${errors.description ? "form-validerr-ring" : "form-valid-err"}
                                                `}
                                            {...register('description', {
                                                required: {
                                                    value: true,
                                                    message: "Description of the fraud incident is required"
                                                }
                                            })}
                                        ></textarea>
                                        {errors.description && <p className="form-error-msg">{errors.description?.message}</p>}
                                    </div> */}

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


                                <div className="w-full flex sm:flex-row flex-col sm:gap-10 gap-3 py-3">
                                    <Button
                                        type="submit"
                                        className={`btn-default sm:min-w-[6.25rem]  ${
                                            creaateUserMutation.isPending ? "sm:min-w-[6.25rem]" : "sm:max-w-max w-full"
                                        }`}
                                    >
                                        {creaateUserMutation.isPending ? (
                                            <span className="flex items-center justify-center sm:w-[6.25rem]"> {/* Ensure the span has the desired width */}
                                                <Loader />
                                            </span>
                                        ) : (
                                            <span>Submit</span>
                                        )}
                                    </Button>
                                </div>
                                </div>
                            </form>
                        </div>

                    </CardContent>
                 </Card>
            </PageLayout>
       </div>
    )
    
};



