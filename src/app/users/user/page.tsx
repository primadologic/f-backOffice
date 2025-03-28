

import DashboardLayout from "@/app/dashboard/dashBoardLayout";
import UserListPage from "@/features/users/pages/user/list";
import RequireRole from "@/service/RBAC/RequireRole";


export default function UsersListPage() {

    return (

       <>
           
            <DashboardLayout>
                <RequireRole allowedRoles={['admin']} message="You need admin access to view this page.">
                    <UserListPage />
                </RequireRole>
            </DashboardLayout>
       </>
    )
    
};
