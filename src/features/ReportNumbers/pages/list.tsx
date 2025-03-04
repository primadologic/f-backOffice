
import { BookOpen, Plus } from "lucide-react";
import { CustomButton } from "@/components/custom-ui/buttons";
import TopNavBar from "@/components/custom-ui/topBarNav";


import ReportNumberListTable from "../tables/reportNumbersTable";
import ReportNumberExport from "../tables/report-number-export";
import ReportNumberViewSheet from "./DetailView";
import PageLayout from "@/features/layout/PagesLayout";
import { useNavigate } from "@tanstack/react-router";



export default function ReportNumberListPage() {


    const navigate = useNavigate()

    return (
       <div className="">
            <TopNavBar pageName="Reported Numbers" icon={BookOpen} />
            <PageLayout>
                <div className="">
                    <div className="w-full flex justify-end !items-center">
                        <div className="flex gap-3 justify-center items-center ">
                            <ReportNumberExport />
                            <CustomButton 
                                onClick={() =>navigate({ to: '/dashboard/report-numbers/create' })} 
                                size={'sm'}
                                className="dark:text-primary-foreground dark:hover:bg-primary/85 text-sm font-medium !px-3 bg-primary text-primary-foreground hover:bg-primary/90"
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
