
import AnalyticsLayout from "../layout/analytics-layout";
import ModelNameDistributionChartComponent from "./sub-charts/ModelNameDistribution";
import VerifybyOriginChartComponent from "./sub-charts/verifybyOrigin";



export default function VerificationTabAnalytics() {

    return (
        <AnalyticsLayout>
             <br />
            <div className="w-full">
                <div className="sm:w-full sm:gap-3 sm:flex sm:flex-row justify-evenly items-center flex flex-col w-full gap-6">
                    <ModelNameDistributionChartComponent />
                    <VerifybyOriginChartComponent />
                </div>
            </div>
        </AnalyticsLayout>
    )
};
