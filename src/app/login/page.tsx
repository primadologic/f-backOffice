import LoginForm from "@/features/auth/login-form";



export default function Page() {

    return (
        <div className="flex min-h-svh w-full items-center justify-center">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
    
};
