
import ReportNumberListPage from "@/features/ReportNumbers/pages/list";
import DashboardLayout from "../dashBoardLayout";
import { ProtectedRoute } from "@/components/providers/protected-route";




export default function ListPage() {

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <ReportNumberListPage />
            </DashboardLayout>
        </ProtectedRoute>
    )
    
};

