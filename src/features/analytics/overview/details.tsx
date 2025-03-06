

import AnalyticsLayout from "../layout/analytics-layout";
import OverviewCards from "./sub-charts/cards";




export default function OverviewPageAnalytics() {

    return (
        <AnalyticsLayout>
            <div className="px-1 py-4">
                <div className="">
                    <OverviewCards />
                    <div className="w-full h-1/2 bg-custom_theme-gray"></div>
                </div>
            </div>
        </AnalyticsLayout>
    )
    
};
