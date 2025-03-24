import { BriefcaseBusiness, Plus } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import CaseFileListTable from "../tables/case-file-table";
import CaseFileExport from "../tables/case-file-export";
import PageLayout from "@/features/layout/PagesLayout";
import { CustomButton } from "@/components/custom-ui/buttons";
import TopNavBar from "@/components/custom-ui/topBarNav";
import UpdateCaseFileDialog from "./update";
import DeleteCaseFileDialog from "./delete-caseFile";
import AssignInvestigatorDialog from "./assign-investigator";
import { useCaseFileListService } from "@/service/case-files/service";
import LoadingSkeleton from "@/components/custom-ui/page-loading-ui";




export default function CaseFilesListPage() {


    const navigate = useNavigate();

    const { status } = useRouterState() // Get the current State of router state
    
    const { isLoading, isPending }  = useCaseFileListService()
    
    if ( status ===  "pending" ) {
        return <LoadingSkeleton />
    } 
    else if (isLoading || isPending) {
        return <LoadingSkeleton />
    }
    

    return (
       <div className="">
            <TopNavBar pageName="Case Files" icon={BriefcaseBusiness} />
            <PageLayout>
                <div className="space-y-8">
                    <div className="flex justify-end item-end">
                        <div className="flex gap-3 justify-center items-center">
                            <CaseFileExport />
                            <CustomButton onClick={() => navigate({ to: '/dashboard/case-files/create' })} 
                                size={'sm'} 
                                variant={'create'}
                                className=""
                                
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                <span className="mr-1">Create Case File</span>
                            </CustomButton>
                           <>
                                <UpdateCaseFileDialog />
                                <DeleteCaseFileDialog />
                                <AssignInvestigatorDialog />
                           </>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <CaseFileListTable />
                        </div>
                    </div>
                </div>
            </PageLayout>
       </div>
    )
    
};
