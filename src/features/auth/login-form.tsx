
import { LoginUserType } from "@/common/Type/auth.type"
// import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { useLoginService } from "@/service/login.service"
import Loader from "@/components/custom-ui/loader"



export default function LoginForm() {

    const { register, handleSubmit, reset, trigger, formState: { errors, isValid }} = useForm<LoginUserType>({
        defaultValues: {
            email: '',
            password: ''
        },
        criteriaMode: 'all',
        mode: 'onChange'
    })

    const loginService = useLoginService();


    const onSubmit = (data: LoginUserType) => {
        // console.log("Login data", data);
        loginService.mutateAsync(data, {
            onSuccess: () => {
                reset();
            }
        })
    }

    return  (
        <div className="">

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    placeholder="m@example.com"
                                    autoComplete="email"
                                    className={`form-input 
                                        ${errors.email ? 'form-validerr-ring' : 'form-valid-ring'}
                                    `}
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: 'Oops! You forgot to enter your email.'
                                        }
                                    })}
                                    onBlur={() => trigger('email')}
                                   
                                />
                                {errors.email && <p className="form-error-msg">{errors.email.message}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center">
                                    <label htmlFor="password"  className="form-label">Password</label>
                                    <a 
                                        href="#"
                                        className="ml-auto inline-block text-sm font-medium underline-offset-4 hover:underline"
                                    >
                                        Forgotyour password?
                                    </a>
                                </div>
                               
                                <input 
                                    type="password" 
                                    placeholder="Enter your password"
                                    autoComplete="current-password" 
                                    className={`form-input 
                                        ${errors.password ? 'form-validerr-ring' : 'form-valid-ring'}
                                    `}
                                    
                                    {...register('password', {
                                        required: {
                                            value: true,
                                            message: "A password is needed to secure your account."
                                        },
                                        minLength: { value: 5, message: "Password must be at least 5 characters" },
                                    })}
                                    onBlur={() => trigger('password')}
                                />
                                {errors.password && <p className="form-error-msg">{errors.password.message}</p>}
                            </div>
                            <button  
                                // variant={"outline"}
                                disabled={!isValid || loginService.isPending}
                                className={`px-3 py-2 text-base font-medium flex justify-center items-center rounded-md dark:bg-custom_theme-primary_background dark:text-custom_theme-primary_foreground dark:hover:bg-custom_theme-primary_background/85 bg-custom_theme-primary_foreground text-white hover:bg-custom_theme-primary_foreground/85
                                        ${!isValid ? " disabled:cursor-not-allowed " : "cursor-pointer"}
                                        ${loginService.isPending ? "opacity-50 disabled:cursor-not-allowed" : "cursor-pointer"}
                                    `}
                            >
                               {loginService.isPending ? (
                                    <>
                                        <Loader />
                                    </>
                               ): (
                                    <span className="">Login</span>
                               )}
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>

        </div>
    )
    
};

