
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function LoginForm() {

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
                    <form className="">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    placeholder="m@example.com"
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center">
                                    <label htmlFor="password"  className="form-label">Password</label>
                                    <a 
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgotyour password?
                                    </a>
                                </div>
                                <input 
                                    type="password" 
                                    className="form-input"
                                />
                            </div>
                            <Button  
                                variant={"outline"}
                                className="px-3 !py-4 dark:bg-custom_theme-primary_background dark:text-custom_theme-primary_foreground dark:hover:bg-custom_theme-primary_background/85 bg-custom_theme-primary_foreground text-white hover:bg-custom_theme-primary_foreground/85 hover:text-white"
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

        </div>
    )
    
};
