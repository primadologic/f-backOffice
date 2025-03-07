

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import OverviewPageAnalytics from "./details"
import InsightsMainTab from "../insights/detail"





export default function OverviewTabs() {

    return (
        
        <Tabs defaultValue="overview">
            <TabsList className="">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <OverviewPageAnalytics />
            </TabsContent>
            
            <TabsContent value="insights">
               <InsightsMainTab />
            </TabsContent>
        </Tabs>
    
    )
    
};
