
import { Plus, UserPlus } from "lucide-react";
import { CustomButton } from "@/components/custom-ui/buttons";
import TopNavBar from "@/components/custom-ui/topBarNav";

import PageLayout from "@/features/layout/PagesLayout";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import UserRoleUpdatePage from "./update";
import UserRoleListExport from "../../table/user-roles/user-role-export";
import UserRoleListTable from "../../table/user-roles/report-table";
import LoadingSkeleton from "@/components/custom-ui/page-loading-ui";
import { useUserRoleService } from "@/service/users/service";



export default function UserRoleList() {

    const navigate = useNavigate();

    const { status } = useRouterState() // Get the current State of router state\

    const { isLoading, isPending, } = useUserRoleService()

    if ( status ===  "pending" ) {
        return <LoadingSkeleton />
    } 
    else if (isLoading || isPending) {
        return <LoadingSkeleton />
    }

    return (
       <div className="">
            <TopNavBar pageName="User Role" icon={UserPlus} />
            <PageLayout>
                <div className="space-y-8 mt-3">
                    <div className="w-full flex sm:justify-end items-center justify-end">
                        <div className="flex sm:flex-row gap-3 justify-center items-center flex-col">
                            {/* export */}
                            <UserRoleListExport />
                            <CustomButton 
                                onClick={() =>navigate({ to: '/dashboard/report-numbers/create' })} 
                                size={'sm'}
                                variant={'create'}
                                className="sr-only"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                <span className="mr-1">Create new role</span>
                                
                            </CustomButton>
                            {/* actions */}
                            <UserRoleUpdatePage />
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                           {/* User Role list */}
                           <UserRoleListTable />
                        </div>
                    </div>
                </div>
            </PageLayout>
       </div>
    )
    
};
