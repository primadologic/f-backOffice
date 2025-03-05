
import ReportNumberCreatePage from "@/features/ReportNumbers/pages/create";
import DashboardLayout from "../dashBoardLayout";
import { ProtectedRoute } from "@/components/providers/protected-route";




export default function CreatePage() {

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <ReportNumberCreatePage />
            </DashboardLayout>
        </ProtectedRoute>
    )
    
};
