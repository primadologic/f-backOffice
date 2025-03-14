import CaseFileDetailMain from "@/features/CaseFiles/pages/detailView/detail-main"
import DashboardLayout from "../dashBoardLayout"
import DetailViewTabs from "@/features/CaseFiles/pages/detailView/detail-tabs"



export default function DetailViewPage() {

    return (

        <DashboardLayout>
            <CaseFileDetailMain />
            <div className="flex flex-col ">
                <DetailViewTabs />
            </div>
        </DashboardLayout>

    )  
};
