
import { CaseFileType } from "@/common/Type/CaseFile/CaseFile.type";
import { ReportNumberType } from "@/data/ReportNumbers/ReportNumbers.type";
import { columns } from "@/features/ReportNumbers/tables/columns";
import { DataTable } from "@/features/ReportNumbers/tables/data-table";
import { useRetrieveCaseFileService } from "@/service/case-files/service"
import { useParams } from "@tanstack/react-router";



export default function DetailReportTab() {
 const { caseId } = useParams({ from: "/dashboard/case-files/$caseId" });  // Get caseId from URL
   
    const caseFileData = useRetrieveCaseFileService(caseId); 
    const response: CaseFileType = caseFileData.data?.data;

    const caseFileReports: ReportNumberType[] = response?.reports || []
    
   
    return (
        <div className="container mx-auto w-full">
            
            <DataTable columns={columns} data={ caseFileReports || []} />

        </div>
    )
    
};
