
import CaseFilesListPage from "@/features/CaseFiles/pages/list"
import DashboardLayout from "../dashBoardLayout"
import RequireRole from "@/service/RBAC/RequireRole"


export default function ListPage() {

    return (

        <DashboardLayout>
            <RequireRole allowedRoles={['admin', 'investigator']}>
                <CaseFilesListPage />
            </RequireRole>
        </DashboardLayout>

    )
    
};
