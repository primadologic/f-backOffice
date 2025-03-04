import { BriefcaseBusiness, Plus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import CaseFileListTable from "../tables/CaseFileTables";
import CaseFileExport from "../tables/case-file-export";
import PageLayout from "@/features/layout/PagesLayout";
import UpdateCaseFile from "./update";
import { CustomButton } from "@/components/custom-ui/buttons";
import TopNavBar from "@/components/custom-ui/topBarNav";




export default function CaseFilesListPage() {


    const navigate = useNavigate()

    return (
       <div className="">
            <TopNavBar pageName="Case Files" icon={BriefcaseBusiness} />
            <PageLayout>
                <div className="">
                    <div className="flex justify-end item-end">
                        <div className="flex gap-3 justify-center items-center">
                            <CaseFileExport />
                            <CustomButton onClick={() => navigate({ to: '/dashboard/case-files/create' })} size={'sm'} className="dark:text-primary-foreground dark:hover:bg-primary/85 text-sm font-medium !px-3 bg-primary text-primary-foreground hover:bg-primary/90">
                                <Plus className="mr-2 h-4 w-4" />
                                <span className="mr-1">Create Case File</span>
                            </CustomButton>
                            <UpdateCaseFile />
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
