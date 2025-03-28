
import AnalyticsLayout from "../layout/analytics-layout";
import PlatformbyOriginChart from "./sub-charts/platformbyOrigin";
import VerificationbyOriginReportChart from "./sub-charts/verifybyOrigin";
import YearlyStatisticsbyOriginChart from "./sub-charts/report-verify-origin";
import YearlyReportStatistics from "./sub-charts/report-stats";
import YearlyPlatformReport from "./sub-charts/platformReport";



export default function InsightsMainTab() {

    return (
        <>
            <AnalyticsLayout>
                <div className="w-full pt-10 pb-12">
                    {/* <div className=" sm:gap-3 sm:flex sm:flex-row justify-evenly items-center flex flex-col w-full gap-6">
                        <ModelNameDistributionChartComponent />
                        <VerificationbyOriginReportChart />
                    </div> */}
                    <div className="flex flex-col gap-4">
                        <div className="w-full flex flex-col-reverse gap-6 justify-between items-center">
                            <YearlyStatisticsbyOriginChart />
                            <YearlyReportStatistics />
                        </div>
                        <div className="w-full flex flex-row gap-6 flex-wrap justify-between items-center">
                            <PlatformbyOriginChart />
                            <VerificationbyOriginReportChart />
                            <YearlyPlatformReport />
                            
                        </div>
                    </div>
                </div>
            </AnalyticsLayout>
        </>
    )
    
};
