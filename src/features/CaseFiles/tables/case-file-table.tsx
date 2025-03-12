// import { useQuery } from "@tanstack/react-query"

import { ApiResponse } from "@/common/api-response.type"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useCaseFileListService } from "@/service/case-files/service"
// import { getData } from "@/service/case.file.service"


export default function CaseFileListTable() {

  // const getCaseFiles = useQuery({
  //     queryKey: ['caseFilesList'],
  //     queryFn: async () => {
  //        return await getData();
  //     } 
  // })

  const response: ApiResponse = useCaseFileListService()?.data

  const caseFile = response?.data || []
  

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={ caseFile || []} />
    </div>
  )
}
