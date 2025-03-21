// import { useQuery } from "@tanstack/react-query"
import { ApiResponse } from "@/common/api-response.type";
import { columns } from "./columns"

// import { getData } from "@/service/report-number.service";
import { useUsers } from "@/service/users/service";

import { DataTable } from "./data-table";
import { UserType } from "@/common/Type/UserRole.type";


export default function UserListTable() {

  // const getCaseFiles = useQuery({
  //     queryKey: ['reportNumberList'],
  //     queryFn: async () => {
  //        return await getData();
  //     }
       
  // })

  const { data: userData } = useUsers() as {
    data: ApiResponse
  }

  const userList: UserType[] = userData?.data || []


  return (
    <div className="container mx-auto ">
      {/* <DataTable columns={columns} data={getCaseFiles.data || []} /> */}
      <DataTable columns={columns} data={ userList || []} />
    </div>
  )
}
