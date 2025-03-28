

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import OverviewPageAnalytics from "./details"
import InsightsMainTab from "../insights/detail"
import RequireRole from "@/service/RBAC/RequireRole"



export default function OverviewTabs() {

    return (
        
        <Tabs defaultValue="overview">
            <TabsList className="grid sm:w-[25rem] w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            <RequireRole allowedRoles={["admin"]} message="You need admin or investigator access to view this page.">
                <TabsContent value="overview">
                    <OverviewPageAnalytics />
                </TabsContent>
            </RequireRole>
            
            <RequireRole allowedRoles={["admin"]} message="You need admin access to view this page.">
                <TabsContent value="insights">
                    <InsightsMainTab />
                </TabsContent>
            </RequireRole>
        </Tabs>
    
    )
    
};
