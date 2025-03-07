

import AnalyticsLayout from "../layout/analytics-layout";
import OverviewCards from "./sub-charts/cards";




export default function OverviewPageAnalytics() {

    return (
        <AnalyticsLayout>
            <div className=" py-4">
                <div className="">
                    <OverviewCards />
                </div>
            </div>
        </AnalyticsLayout>
    )
    
};
