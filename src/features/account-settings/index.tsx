import { UserRoundPen } from "lucide-react";
import TopNavBar from "@/components/custom-ui/topBarNav";
import PageLayout from "@/features/layout/PagesLayout";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useUsers } from "@/service/users/service";
import LoadingSkeleton from "@/components/custom-ui/page-loading-ui";
import UserAvatarComponent from "./profile-picture";
import UserInfoComponent from "./personal-info";



export default function AccountSettingsComponent() {

    const navigate = useNavigate();
    const { status } = useRouterState() // Get the current State of router state\

    const { isLoading, isPending, } = useUsers();

    if ( status ===  "pending" ) {
        return <LoadingSkeleton />
    } 
    else if (isLoading || isPending) {
        return <LoadingSkeleton />
    }


    // Show skeleton if the routeis still loading

    return (
       <div className="py-3">
            <TopNavBar pageName="My Profile" icon={UserRoundPen } />
            <PageLayout>
                <div className="space-y-10 mt-3">
                    
                    <div className="flex flex-col gap-y-6">
                        <div className="">
                            <UserAvatarComponent user={{}} />
                        </div>
                        <div className="">
                            <UserInfoComponent user={{}} />
                        </div>
                    </div>
                </div>
            </PageLayout>
       </div>
    )
    
};
