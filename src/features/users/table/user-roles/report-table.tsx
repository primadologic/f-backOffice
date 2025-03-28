// import { useQuery } from "@tanstack/react-query"
import { ApiResponse } from "@/common/api-response.type";
import { columns } from "./columns"
import { DataTable } from "./data-table"
// import { getData } from "@/service/report-number.service";
import { useUserRoleService } from "@/service/users/service";


export default function UserRoleListTable() {

  // const getCaseFiles = useQuery({
  //     queryKey: ['reportNumberList'],
  //     queryFn: async () => {
  //        return await getData();
  //     }
       
  // })

  const response: ApiResponse = useUserRoleService()?.data

  const role = response?.data || []


  return (
    <div className="container mx-auto ">
      {/* <DataTable columns={columns} data={getCaseFiles.data || []} /> */}
      <DataTable columns={columns} data={ role || []} />
    </div>
  )
}
