import { UserRoundPen } from "lucide-react";
import TopNavBar from "@/components/custom-ui/topBarNav";
import PageLayout from "@/features/layout/PagesLayout";
import { useRouterState } from "@tanstack/react-router";
import LoadingSkeleton from "@/components/custom-ui/page-loading-ui";
import UserAvatarComponent from "./profile-avatar";
import UserInfoComponent from "./personal-info";
import ChangePasswordComponent from "./change-password";
import { useCurrentUser, UserResponse } from "@/service/accounts/fetchCurrentUser";





export default function AccountSettingsComponent() {

    const { status } = useRouterState() // Get the current State of router state\

    const { data: userResponse, isLoading, isError, error} = useCurrentUser() as {
        data: UserResponse;
        isLoading: boolean;
        isError: boolean;
        error: Error
    }

    if ( status ===  "pending" ) {
        return <LoadingSkeleton />
    } 
    else if (isLoading) {
        return <LoadingSkeleton />
    }

    if (!userResponse?.data) {
        return <div>No user data available.</div>; // Or handle it as you like
    }

    if (isError) {
        return <div>Error: {error?.message || "Something went wrong!"}</div>;
    }

    
    if (isError) {
        return <div>Error: {error?.message || "Something went wrong!"}</div>;
    }
    


    // Show skeleton if the routeis still loading

    return (
       <div className="py-5 mb-5">
            <TopNavBar pageName="My Profile" icon={UserRoundPen } />
            <PageLayout>
                <div className="space-y-10 mt-3">
                    
                    <div className="flex flex-col gap-y-6">
                        <div className="">
                            <UserAvatarComponent user={userResponse} />
                        </div>
                        <div className="">
                            <UserInfoComponent user={userResponse} />
                        </div>
                        <div className="">
                            <ChangePasswordComponent />
                        </div>
                    </div>
                </div>
            </PageLayout>
       </div>
    )
    
};
