
import CaseFileCreatePage from "@/features/CaseFiles/pages/create"
import DashboardLayout from "../dashBoardLayout"
import { ProtectedRoute } from "@/components/providers/protected-route"


export default function CreatePage() {

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <CaseFileCreatePage />
            </DashboardLayout>
        </ProtectedRoute>
    )
    
};
