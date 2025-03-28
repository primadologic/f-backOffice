
import ReportNumberCreatePage from "@/features/ReportNumbers/pages/create";
import DashboardLayout from "../dashBoardLayout";
import RequireRole from "@/service/RBAC/RequireRole";



export default function CreatePage() {

    return (

        <DashboardLayout>
            <RequireRole  allowedRoles={['admin']} message="You need admin access to view this page">
                <ReportNumberCreatePage />
            </RequireRole>
        </DashboardLayout>
    )
    
};
