
import AnalyticsLayout from "../layout/analytics-layout";
import PageViewsComponent from "./sub-charts/page-view.charts";
import { BrowserChartComponent } from "./sub-charts/browsers.chart";



export default function FraudWallTabAnalytics() {

    return (
        <AnalyticsLayout>
            <br />
            <div className="w-full">
                <div className="lg:flex-row lg:gap-6 sm:w-full sm:gap-3 sm:flex sm:flex-row md:flex-col md:gap-6 justify-evenly items-center flex flex-col w-full gap-6">
                    <PageViewsComponent />
                    <BrowserChartComponent />
                </div>
            </div>
        </AnalyticsLayout>
    )
    
};
