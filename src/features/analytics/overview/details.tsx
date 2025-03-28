

import NewOverviewCards from "@/components/custom-ui/overview-loading";
import AnalyticsLayout from "../layout/analytics-layout";
// import OverviewCards from "./sub-charts/cards";




export default function OverviewPageAnalytics() {

    return (
        <AnalyticsLayout>
            <div className="pt-10 pb-12">
                <div className="">
                    {/* <OverviewCards /> */}
                    <NewOverviewCards />
                </div>
            </div>
        </AnalyticsLayout>
    )
    
};
