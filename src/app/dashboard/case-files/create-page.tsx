
import CaseFileCreatePage from "@/features/CaseFiles/pages/create"
import DashboardLayout from "../dashBoardLayout"
import RequireRole from "@/service/RBAC/RequireRole"


export default function CreatePage() {

    return (

        <DashboardLayout>
            <RequireRole allowedRoles={['admin', 'investigator']}>
                <CaseFileCreatePage />
            </RequireRole>
        </DashboardLayout>
    )
    
};
