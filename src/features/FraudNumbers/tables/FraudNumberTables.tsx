// import { useQuery } from "@tanstack/react-query"
import { columns } from "./columns"
import { DataTable } from "./data-table"
// import { getData } from "@/service/fraud-number.service"
import { useFraudNumberListService } from "@/service/fraud-numbers/service"
import { ApiResponse } from "@/common/api-response.type"
import { FraudNumberNewType } from "@/common/Type/FraudNumber/fraud-numbers"



export default function FraudNumberListTable() {

  // const useGetFraudNumber = useQuery({
  //     queryKey: ['fraudNumberList'],
  //     queryFn: async () => {
  //        return await getData();
  //     }       
  // })

  const { data: fraudNumberData } = useFraudNumberListService() as {
    data: ApiResponse
  }

  const fraudNumbers: FraudNumberNewType[] = fraudNumberData?.data


  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={fraudNumbers || []} />
    </div>
  )
}
