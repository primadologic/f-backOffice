
import AnalyticsLayout from "../layout/analytics-layout";
import ModelNameDistributionChartComponent from "./sub-charts/ModelNameDistribution";
import PlatformbyOriginChart from "./sub-charts/platformbyOrigin";
import VerificationbyOriginReportChart from "./sub-charts/verifybyOrigin";



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
                            <ModelNameDistributionChartComponent />
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
