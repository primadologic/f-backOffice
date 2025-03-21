
import { BookOpen, Plus } from "lucide-react";
import { CustomButton } from "@/components/custom-ui/buttons";
import TopNavBar from "@/components/custom-ui/topBarNav";


import ReportNumberListTable from "../tables/report-table";
import ReportNumberExport from "../tables/report-number-export";
import ReportNumberViewSheet from "./detail-view";
import PageLayout from "@/features/layout/PagesLayout";
import { useNavigate } from "@tanstack/react-router";



export default function ReportNumberListPage() {

    const navigate = useNavigate()

    return (
       <div className="">
            <TopNavBar pageName="Reported Numbers" icon={BookOpen} />
            <PageLayout>
                <div className="space-y-8 mt-3">
                    <div className="w-full flex sm:justify-end items-center justify-end">
                        <div className="flex sm:flex-row gap-3 justify-center items-center flex-col">
                            <ReportNumberExport />
                            <CustomButton 
                                onClick={() =>navigate({ to: '/dashboard/report-numbers/create' })} 
                                size={'sm'}
                                variant={'create'}
                                className=""
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                <span className="mr-1">Create Report Number</span>
                                
                            </CustomButton>
                            <ReportNumberViewSheet />
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <ReportNumberListTable />
                        </div>
                    </div>
                </div>
            </PageLayout>
       </div>
    )
    
};
