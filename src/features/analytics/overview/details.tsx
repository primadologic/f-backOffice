
import TopNavBar from "@/components/custom-ui/topBarNav";
import AnalyticsLayout from "../layout/analytics-layout";
import OverviewTabs from "./overview-tabs";
import { LayoutDashboard } from "lucide-react";




export default function OverviewPageAnalytics() {

    return (
        <AnalyticsLayout>
            <TopNavBar pageName="Dashboard" icon={LayoutDashboard}/>
            <OverviewTabs />
        </AnalyticsLayout>
    )
    
};
