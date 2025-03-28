
import DashboardLayout from "@/app/dashboard/dashBoardLayout";
import UserRoleList from "@/features/users/pages/user-role/list";
import RequireRole from "@/service/RBAC/RequireRole";


export default function Page() {

    return (
        <DashboardLayout>
            <RequireRole allowedRoles={['admin']} message="You need admin access to view this page.">
                <UserRoleList />
            </RequireRole>
        </DashboardLayout>
    )
    
};
