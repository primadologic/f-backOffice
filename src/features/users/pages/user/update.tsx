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
import { useGetUserDetails, useUserRoleService } from "@/service/users/service";
import { useUserStore } from "@/hooks/state/users/user.state";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateUserComponent() {
    const { token: access } = useAuth();
    const { selectedUser } = useUserStore();
  
    const getUserData = useGetUserDetails(selectedUser || "defaultUser");
    const userRoleService = useUserRoleService();
    const userRoleData: UserRole[] = userRoleService.data?.data || [];

    const [isLoading, setIsLoading] = useState(true);
  
    const {
      register,
      handleSubmit,
      control,
      reset,
      formState: { errors },
    } = useForm<CreateUserType>({
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
          dateDeleted: "",
        },
      },
      criteriaMode: "firstError",
    });
  
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const updateUserMutation = useMutation({
        mutationKey: ['update-user', selectedUser],
        mutationFn: async (newData: CreateUserType) => {
            try {
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

                    queryClient.invalidateQueries({ queryKey: ['users'] })
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

    useEffect(() => {
        if (getUserData.data && userRoleService.isSuccess) {
            reset({
                firstName: getUserData.data.data.firstName || "",
                lastName: getUserData.data.data.lastName || "",
                email: getUserData.data.data.email || "",
                password: "",
                roleId: {
                    id: getUserData.data.data.role?.id || "",
                    roleName: getUserData.data.data.role?.roleName || "",
                    dateCreated: "",
                    description: "",
                    dateUpdated: "",
                    dateDeleted: "",
                },
            });
            setIsLoading(false);
        }
    }, [getUserData.data, userRoleService.isSuccess, reset]);

    const onSubmit = (data: CreateUserType) => {
        updateUserMutation.mutateAsync(data)
    }

    // Loading Skeleton
    if (isLoading || getUserData.isLoading || userRoleService.isLoading) {
        return (
            <div className="py-3">
                {/* <TopNavBar pageName="Update User" icon={UserRoundPen} /> */}
                <Skeleton className="h-5 w-32" />
                <PageLayout>
                    <div className="pt-7"/>
                    <Card className="rounded-[1.8rem] border">
                        <CardHeader>
                            <CustomBackButton />
                            <Skeleton className="h-5 w-32" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex gap-5">
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                                <div className="flex gap-5">
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                </PageLayout>
            </div>
        );
    }

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
                                                        ${errors.email ? "form-validerr-ring" : "form-valid-ring"}
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
                                                    <Select 
                                                        onValueChange={onChange} 
                                                        defaultValue={getUserData.data?.data?.role?.id}
                                                    >
                                                        <SelectTrigger 
                                                            onBlur={onBlur}
                                                            className={`outline-none border py-3 px-3 !w-full text-sm font-medium text-custom_theme-primary_foreground dark:bg-custom_theme-dark_gray_1 dark:text-custom_theme-primary_background focus:ring-1 focus:ring-gray-400 dark:focus:ring-custom_theme-gray delay-150 transition ease-in-out duration-300
                                                                    ${errors.roleId?.id ? "form-validerr-ring " : "form-valid-ring"}
                                                                `}
                                                        >
                                                            <SelectValue placeholder="Select user role"  />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {userRoleService.isFetched ?  
                                                            userRoleData?.map((role) => (
                                                                <SelectItem key={role.id} value={role?.id || 'undefined'}>
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
                                                <span className="flex items-center justify-center sm:w-[6.25rem]">
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