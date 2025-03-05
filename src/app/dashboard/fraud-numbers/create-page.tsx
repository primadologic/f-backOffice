
import FraudNumberCreatePage from "@/features/FraudNumbers/pages/create";
import DashboardLayout from "../dashBoardLayout";
import { ProtectedRoute } from "@/components/providers/protected-route";



export default function CreatePage() {

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <FraudNumberCreatePage />
            </DashboardLayout>
        </ProtectedRoute>
    )
    
};
