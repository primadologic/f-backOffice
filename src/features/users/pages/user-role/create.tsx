
import PageLayout from "@/features/layout/PagesLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-separator";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import TopNavBar from "@/components/custom-ui/topBarNav";
import Loader from "@/components/custom-ui/loader";
import { CustomBackButton } from "@/components/custom-ui/custom-buttons";
import { CreateUserRoleType } from "@/common/Type/UserRole.type";
import { useCreateUserRoleService, } from "@/service/users/service";
import { ShieldUser } from "lucide-react";



export default function UserRoleCreateComponent() {


    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserRoleType>({
        defaultValues: {
           roleName: "",
           description: "",
           displayName: ""
        },
        criteriaMode: "firstError"
    })

    const createUserRole = useCreateUserRoleService();
    
    const onSubmit = (data: CreateUserRoleType) => {
        createUserRole.mutateAsync(data); 
    };


    return (
       <div className="py-3">
            <TopNavBar pageName="Create User Role" icon={ShieldUser} />
            <PageLayout>
                <div className="pt-7"/>
                 <Card className="rounded-[1.8rem] border">
                    <div className="w-full flex flex-row justify-between items-center">
                        <CardHeader className="flex flex-row justify-start items-center gap-x-5">
                            <CustomBackButton />
                          <div className="">
                            <CardTitle>Role</CardTitle>
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
                                            <label htmlFor="first-name" className="form-label">Role Name</label>
                                            <input 
                                                type="text" 
                                                placeholder="Role Name"
                                                className={`form-input
                                                        ${errors.roleName ? "form-validerr-ring" : "form-valid-ring"}
                                                    `} 
                                                {...register('roleName', {
                                                    required: {
                                                        value: true,
                                                        message: "Role name is required"
                                                    },
                                                })}
                                            />
                                            {errors.roleName && <p className="form-error-msg">{errors.roleName?.message}</p>}
                                        </div>
                                        <div className="w-full flex flex-col gap-2 ">
                                            <label htmlFor="last-name" className="form-label">Display Name</label>
                                            <input 
                                                type="text" 
                                                placeholder="Display Name"
                                                className={`form-input
                                                        ${errors.displayName ? "form-validerr-ring" : "form-valid-ring"}
                                                    `} 
                                                {...register("displayName", {
                                                    required: {
                                                        value: true,
                                                        message: "Display name is required"
                                                    },
                                                })}
                                            />
                                            {errors.displayName && <p className="form-error-msg">{errors.displayName?.message}</p>}
                                        </div>
                                    </div>
                                    <div className="flex sm:flex-row flex-col gap-5 justify-center items-center">
                                        <div className="w-full flex flex-col gap-2 ">
                                            <label htmlFor="email" className="form-label">Description</label>
                                            <input 
                                                type="text" 
                                                placeholder="Description"
                                                className={`form-input
                                                        ${errors.description ? "form-validerr-ring" : "form-valid-ring"}
                                                    `} 
                                                {...register("description", {
                                                    required: {
                                                        value: true,
                                                        message: "Email is required"
                                                    }
                                                })}
                                            />
                                            {errors.description && <p className="form-error-msg">{errors.description?.message}</p>}
                                        </div>

                                       
                                    </div>

                                <div className="w-full flex sm:flex-row flex-col sm:gap-10 gap-3 py-3">
                                    <Button
                                        type="submit"
                                        className={`btn-default sm:min-w-[6.25rem]  ${
                                            createUserRole.isPending ? "sm:min-w-[6.25rem]" : "sm:max-w-max w-full"
                                        }`}
                                    >
                                        {createUserRole.isPending ? (
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



