import { ApiResponse } from "@/common/api-response.type";
import { columns } from "@/features/ReportNumbers/tables/columns";
import { DataTable } from "@/features/ReportNumbers/tables/data-table";
import { useDetailCaseFile } from "@/hooks/state/case-files/case-file-store";
import { useRetrieveCaseFileService } from "@/service/case-files/service"



export default function DetailReportTab() {

    const { selectedCaseFile } = useDetailCaseFile();

    const caseId: string | null  = selectedCaseFile?.caseId ?? null

    const retrieveCaseFile: ApiResponse = useRetrieveCaseFileService(caseId).data;

    const report = retrieveCaseFile?.data?.reports || []
   
    return (
        <div className="container mx-auto w-full">
            
            <DataTable columns={columns} data={ report || []} />

        </div>
    )
    
};
