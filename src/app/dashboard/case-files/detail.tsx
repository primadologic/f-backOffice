import CaseFileDetailMain from "@/features/CaseFiles/pages/detailView/detail-main"
import DashboardLayout from "../dashBoardLayout"
import DetailViewTabs from "@/features/CaseFiles/pages/detailView/detail-tabs"
import RequireRole from "@/service/RBAC/RequireRole"



export default function DetailViewPage() {

    return (

        <DashboardLayout>
            <RequireRole allowedRoles={['admin']}>
                <CaseFileDetailMain />
                <div className="flex flex-col ">
                    <DetailViewTabs />
                </div>
            </RequireRole>
        </DashboardLayout>

    )  
};
