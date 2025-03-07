
import AnalyticsLayout from "../layout/analytics-layout";
import PlatformbyOriginChart from "./sub-charts/platformbyOrigin";
import VerificationbyOriginReportChart from "./sub-charts/verifybyOrigin";
import YearlyStatisticsbyOriginChart from "./sub-charts/report-verify-origin";



export default function InsightsMainTab() {

    return (
        <>
            <AnalyticsLayout>
                <br />
                <div className="w-full">
                    {/* <div className=" sm:gap-3 sm:flex sm:flex-row justify-evenly items-center flex flex-col w-full gap-6">
                        <ModelNameDistributionChartComponent />
                        <VerificationbyOriginReportChart />
                    </div> */}
                    <div className="flex flex-col gap-4">
                        <div className="w-full">
                            <YearlyStatisticsbyOriginChart />
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <PlatformbyOriginChart />
                            <VerificationbyOriginReportChart />
                        </div>
                    </div>
                </div>
            </AnalyticsLayout>
        </>
    )
    
};
