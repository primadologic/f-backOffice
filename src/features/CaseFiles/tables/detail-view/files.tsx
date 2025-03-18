
import { CaseFileType } from "@/common/Type/CaseFile/CaseFile.type";
import { ReportNumberType } from "@/common/Type/ReportNumbers/report-number";
import { useRetrieveCaseFileService } from "@/service/case-files/service";
import { useParams } from "@tanstack/react-router";



export default function DetailViewFilesTab() {

  
    const { caseId } = useParams({ from: "/dashboard/case-files/$caseId" });  // Get caseId from URL
   
    const caseFileData = useRetrieveCaseFileService(caseId); 
    const response: CaseFileType = caseFileData.data?.data;

    const caseFileReports: ReportNumberType[] = response?.reports || []
    
    const allReportFiles: string[] = caseFileReports
    .flatMap((report) => report?.reportFiles || [])  // Flatten all reportFiles
    .filter((file) => file.startsWith('http')); // Keep only the files that are URLs


    return (
        <div className="my-10">
            <div className="space-y-2 max-w-max">
                <label htmlFor="report files" className="text-start text-sm font-medium">
                   Report Files
                </label>
                <div className="">
                 
                        {/* <div className="flex items-center justify-between space-x-4 px-4 py-3">
                            <h4 className="text-sm font-semibold sm:block hidden">
                                Click to view files
                            </h4>
                            <h4 className="text-sm font-semibold sm:hidden block">
                                Tap to view files
                            </h4>
                            
                        </div> */}

                       
                        {allReportFiles.length > 0 ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {allReportFiles.map((data, index) => (
                              <div
                                key={index}
                                className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
                              >
                                <a href={data} target="_blank" className="block w-full truncate">
                                  Evidence {index + 1}
                                </a>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="px-4 py-3 text-sm text-gray-500">
                            No files available.
                          </div>
                        )}

                
                </div>
            </div>
        </div>
    )
    
};
