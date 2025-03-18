
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import DetailReportTab from "../../tables/detail-view/reports"
import DetailViewFilesTab from "../../tables/detail-view/files"
import DetailViewCommentTab from "../../tables/detail-view/notes"



export default function DetailViewTabs() {

    return (
        <div className="">
            <Tabs defaultValue="reports" className="w-full space-y-5">
                <TabsList className="grid grid-cols-3 w-[25rem]">
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="reports" className="w-full">
                    {/* <div className="text-base font-medium text-left">Reported numbers assigned to this case file</div> */}
                    <DetailReportTab />
                </TabsContent>
                <TabsContent value="files">
                    {/* <div className="text-base font-medium text-left">Files associated reports</div> */}
                    <DetailViewFilesTab />
                </TabsContent>
                <TabsContent value="notes">
                    <DetailViewCommentTab />
                </TabsContent>
            </Tabs>
        </div>
    )
    
};
