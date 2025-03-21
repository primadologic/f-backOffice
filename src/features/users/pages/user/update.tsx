
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
import { UserRoundPen } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import Loader from "@/components/custom-ui/loader";
import { CustomBackButton } from "@/components/custom-ui/custom-buttons";
import { CreateUserType, UserRole } from "@/common/Type/UserRole.type";
import { useAuth } from "@/hooks/useAuth";
import { useGetUserService, useUserRoleService } from "@/service/users/service";
import { useUpdateUserStore } from "@/hooks/state/users/user.state";
import { ApiResponse } from "@/common/api-response.type";
import { useEffect } from "react";



export default function UpdateUserComponent() {

    const { token: access } = useAuth();
    const { selectedUser} = useUpdateUserStore();
    const userId = selectedUser?.userId as string
    const getUserService = useGetUserService(userId);

    const {data: getUser} = getUserService as {
        data: ApiResponse
    }

    const getUserData: CreateUserType | undefined = getUser?.data || undefined;

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<CreateUserType>({
        defaultValues: {
            firstName: getUserData?.firstName || "",
            lastName: getUserData?.lastName || "",
            email: getUserData?.email || "",
            password: "",
            roleId: getUserData?.roleId || {
                id: "",
                roleName: "",
                dateCreated: "",
                description: "",
                dateUpdated: "",
                dateDeleted: ""
            },
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
/*     const [files, setFiles] = useState<File[]>([]);
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
    }; */


    const updateUserMutation = useMutation({
        mutationKey: ['update-user', userId],
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


                console.log("FormData entries:", Array.from(formData.entries()));
    
                const response = await axios.post(`${API_BASE_URL}/api/users/${userId}`, formData, {
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
                        toast.info(`${err.response?.data?.message} `, {
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
                        toast.error(`${err.response?.data?.message}`);
                        console.log("Error 401");
                        reset();
                        // setFiles([]);
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
        updateUserMutation.mutateAsync(data); 
    };


    useEffect(() => {
        if (getUserData) {
            reset({
                firstName: getUserData.firstName || "",
                lastName: getUserData.lastName || "",
                email: getUserData.email || "",

                roleId: getUserData.roleId || {
                    id: "",
                    roleName: "",
                    dateCreated: "",
                    description: "",
                    dateUpdated: "",
                    dateDeleted: ""
                },
                // avatarUrl: getUserData.avatarUrl || null
            });
        }
    }, [getUserData, reset])


    return (
       <div className="py-3">
            <TopNavBar pageName="Update User" icon={UserRoundPen} />
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

                                    </div>
                                    <div className="flex sm:flex-row flex-col gap-5 justify-center items-center">
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
                                                render={({ field: {onBlur, onChange} }) => (
                                                    <Select onValueChange={onChange} defaultValue={selectedUser?.role.id}>
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
                                                                <SelectItem key={role.id} value={role.id}>
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
                                       


                                <div className="w-full flex sm:flex-row flex-col sm:gap-10 gap-3 py-3">
                                    <Button
                                        type="submit"
                                        className={`btn-default sm:min-w-[6.25rem]  ${
                                            updateUserMutation.isPending ? "sm:min-w-[6.25rem]" : "sm:max-w-max w-full"
                                        }`}
                                    >
                                        {updateUserMutation.isPending ? (
                                            <span className="flex items-center justify-center sm:w-[6.25rem]"> {/* Ensure the span has the desired width */}
                                                <Loader />
                                            </span>
                                        ) : (
                                            <span>Update</span>
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



