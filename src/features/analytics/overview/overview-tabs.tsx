

import OverviewMainDashboard from "../OverviewMainDashboard"
import FraudNumbersAnalytics from "../FraudNumbers/details"
import FraudWallTabAnalytics from "../FraudWallClient/details"
import VerificationTabAnalytics from "../verification/details"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"



export default function OverviewTabs() {

    return (
        <Tabs defaultValue="overview">
             <TabsList className="">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="fraudwallClient">FraudWall Client</TabsTrigger>
                <TabsTrigger value="verification">Verification Insights</TabsTrigger>
                <TabsTrigger value="reportedNumbers">Reported Numbers</TabsTrigger>
                <TabsTrigger value="fraudNumbers">Fraud Numbers</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <OverviewMainDashboard />
            </TabsContent>
            <TabsContent value="fraudwallClient">
                <FraudWallTabAnalytics />
            </TabsContent>
            <TabsContent value="verification">
                <VerificationTabAnalytics />
            </TabsContent>
            <TabsContent value="fraudNumbers">
               <FraudNumbersAnalytics />
            </TabsContent>

        </Tabs>
    )
    
};
