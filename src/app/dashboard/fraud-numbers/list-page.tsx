
import FraudNumberListPage from "@/features/FraudNumbers/pages/list";
import DashboardLayout from "../dashBoardLayout";
import RequireRole from "@/service/RBAC/RequireRole";





export default function ListPage() {

    return (

        <DashboardLayout>
            <RequireRole allowedRoles={['admin']}>
                <FraudNumberListPage />
            </RequireRole>
        </DashboardLayout>

    )
    
};
