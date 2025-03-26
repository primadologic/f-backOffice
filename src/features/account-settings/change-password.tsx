import { ChangePasswordType } from "@/common/Type/accounts-settings.type"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    // CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useChangePasswordService } from "@/service/accounts/service"
import { Loader } from "lucide-react"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"



export default function ChangePasswordComponent() {

    const { register, handleSubmit, watch, reset, clearErrors, formState: { errors } } = useForm<ChangePasswordType>({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        criteriaMode: "firstError",
        mode: "onChange"
    })

    const newPasswordvalue = watch('newPassword')

    const changePassword = useChangePasswordService();


    const onSubmit = (data: ChangePasswordType) => {
        console.log("Password Change data", data);
        changePassword.mutateAsync(data)
    }

    const handleReset = () => {
        reset();
        clearErrors();
    }

    return (
        <div className="">
            <Card>
                <CardHeader  className="flex flex-row justify-between items-start">
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action="" onSubmit={handleSubmit(onSubmit)} className="sm:w-[35vw] w-full">
                        <div className="flex sm:flex-col flex-col gap-4">
                            <div className="flex flex-col gap-2 ">
                                <label htmlFor="current-password" className="form-label">Current Password</label>
                                <div className="space-y-1">
                                    {/* <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />  */}
                                    <input
                                        type="password"
                                        {...register('currentPassword', {
                                            required: {
                                                value: true,
                                                message: "Current Password is required"
                                            }
                                        })}
                                        // onBlur={() => trigger('currentPassword')}
                                        className= {`form-input w-full
                                                ${errors.currentPassword? "form-validerr-ring" : "form-valid-ring"}
                                            `}
                                            // Added padding to accommodate the icon
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="currentPassword"
                                        render={({ message }) => 
                                            <p className="form-error-msg">{message}</p>
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="new-password" className="form-label">New Password</label>
                                <div className="space-y-1"> 
                                    {/* <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />  */}
                                    <input
                                        type="password"
                                        {...register('newPassword', {
                                            required: {
                                                value: true,
                                                message: "New Password is required"
                                            },
                                            validate: {
                                                length: (value) =>
                                                    value.length >= 8 ||
                                                    "Password must be at least 8 characters",
                                                uppercase: (value) =>
                                                    /[A-Z]/.test(value) ||
                                                    "Password must contain an uppercase letter",
                                                lowercase: (value) => 
                                                    /[a-z]/.test(value) || 
                                                    "Password must contain a lowercase letter",
                                                number: (value) => 
                                                    /\d/.test(value)  ||
                                                    "Password must contain a number",
                                                symbol: (value) =>
                                                    /[@$!%*?&]/.test(value) ||
                                                    "Password must contain a symbol",
                                            },
                                        })}
                                        className={`form-input w-full
                                            ${errors.newPassword ? "form-validerr-ring" : "form-valid-ring"}
                                        `} // Added padding to accommodate the icon

                                        // onBlur={() => trigger('newPassword')}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="newPassword"
                                        render={({ message }) => 
                                            <p className="form-error-msg">{message}</p>
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="new-password" className="form-label">Confirm Password</label>
                                <div className="space-y-1"> 
                                    {/* <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                                    <input
                                        type="password"
                                        className={`form-input w-full
                                                ${errors.confirmPassword ? "form-validerr-ring" : "form-valid-ring"}
                                            `} // Added padding to accommodate the 
                                            {...register('confirmPassword', {
                                                required: {
                                                    value: true,
                                                    message: "Confirm Password is required"
                                                },
                                                validate: (value) => 
                                                    value === newPasswordvalue || 
                                                    "Password  do not match",
                                                
                                            })}
                                        // onBlur={() => trigger('confirmPassword')}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="confirmPassword"
                                        render={({ message }) => 
                                            <p className="form-error-msg">{message}</p>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full pt-7 flex sm:flex-row gap-x-6 gap-y-3 flex-col-reverse">
                            <Button 
                                onClick={handleReset}
                                className="btn-default btn-dark-mode min-w-[100px]" 
                                variant={'outline'}            
                            >
                                Cancel
                            </Button>
                            <Button  
                                type="submit" 
                                className={`btn-default sm:min-w-[6.25rem]  ${ changePassword.isPending ? "sm:min-w-[6.25rem]" : "sm:max-w-max w-full"}`}
                            >
                                {changePassword.isPending ? (
                                    <span className="flex items-center justify-center sm:w-[6.25rem]"> 
                                        <Loader /> 
                                    </span>
                                ) : (
                                    <span>Change Password</span>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
    
};
