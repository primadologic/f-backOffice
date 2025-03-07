

import DashboardLayout from "./dashBoardLayout";
import { ProtectedRoute } from "@/components/providers/protected-route";
import OverviewTabs from "@/features/analytics/overview/overview-tabs";


export default function Page() {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="py-1"></div>
          <OverviewTabs />
        </DashboardLayout>
      </ProtectedRoute>
    )
}
  
  
  
  
  