
import DashboardLayout from "@/app/dashboard/dashBoardLayout";
import { ProtectedRoute } from "@/components/providers/protected-route";
import UserRoleList from "@/features/users/pages/user-role/list";


export default function Page() {

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <UserRoleList />
            </DashboardLayout>
        </ProtectedRoute>
    )
    
};
