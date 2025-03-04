import { useQuery } from "@tanstack/react-query"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getData } from "@/service/reportNumberService";



export default function ReportNumberListTable() {

  const getCaseFiles = useQuery({
      queryKey: ['reportNumberList'],
      queryFn: async () => {
         return await getData();
      }
       
  })

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={getCaseFiles.data || []} />
    </div>
  )
}
