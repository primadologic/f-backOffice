import { useQuery } from "@tanstack/react-query"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { getData } from "@/service/fraudNumberService"



export default function FraudNumberListTable() {

  const useGetFraudNumber = useQuery({
      queryKey: ['fraudNumberList'],
      queryFn: async () => {
         return await getData();
      }       
  })

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={useGetFraudNumber.data || []} />
    </div>
  )
}
