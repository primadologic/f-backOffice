import { useQuery } from "@tanstack/react-query"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getData } from "@/service/case.file.service"


export default function CaseFileListTable() {

  const getCaseFiles = useQuery({
      queryKey: ['caseFilesList'],
      queryFn: async () => {
         return await getData();
      } 
  })

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={getCaseFiles.data || []} />
    </div>
  )
}
