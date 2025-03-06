

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import VerificationTabAnalytics from "../verification/details"
import OverviewPageAnalytics from "./details"




export default function OverviewTabs() {

    return (
        
        <Tabs defaultValue="overview">
            <TabsList className="">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reports">Insights</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <OverviewPageAnalytics />
            </TabsContent>
            
            <TabsContent value="reports">
                <VerificationTabAnalytics />
            </TabsContent>
        </Tabs>
    
    )
    
};
