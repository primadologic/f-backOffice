
import FraudNumberListPage from "@/features/FraudNumbers/pages/list";
import DashboardLayout from "../dashBoardLayout";
import { ProtectedRoute } from "@/components/providers/protected-route";




export default function ListPage() {

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <FraudNumberListPage />
            </DashboardLayout>
        </ProtectedRoute>
    )
    
};
