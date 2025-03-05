
import OverviewPageAnalytics from "@/features/analytics/overview/details";
import DashboardLayout from "./dashBoardLayout";
import { ProtectedRoute } from "@/components/providers/protected-route";


export default function Page() {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <OverviewPageAnalytics />
        </DashboardLayout>
      </ProtectedRoute>
    )
}
  
  
  
  
  