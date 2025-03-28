
import FraudNumberCreatePage from "@/features/FraudNumbers/pages/create";
import DashboardLayout from "../dashBoardLayout";
import RequireRole from "@/service/RBAC/RequireRole";




export default function CreatePage() {

    return (

        <DashboardLayout>
            <RequireRole allowedRoles={['admin']}>
                <FraudNumberCreatePage />
            </RequireRole>
        </DashboardLayout>

    )
    
};
