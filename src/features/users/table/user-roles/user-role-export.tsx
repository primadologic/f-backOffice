
// import { useQuery } from "@tanstack/react-query";

import { ApiResponse } from "@/common/api-response.type";
import { UserType } from "@/common/Type/UserRole.type";
import TableExport from "@/components/custom-ui/table-export";
// import { getData } from "@/service/report-number.service";
import { useUserRoleService } from "@/service/users/service";



// Your existing getData function...

export default function UserRoleListExport() {


  const { data: userRoleData } = useUserRoleService() as {
    data: ApiResponse
  }

  const userRoleList: UserType[] = userRoleData?.data || []



  const userRoleListColumns = [
    {
      label: 'Role Id',
      value: 'roleId'
    },
    {
      label: 'Role Name',
      value: 'roleName'
    },
    {
      label: 'Description',
      value: 'description'
    },
    {
      label: 'Date Created',
      value: 'dateCreated',
      transform: (value: string) => new Date(value)?.toLocaleDateString()
    },
    {
      label: 'Date Updated',
      value: 'dateUpdated',
      transform: (value: string) => new Date(value)?.toLocaleDateString()
    },
    {
      label: 'Date Deleted',
      value: 'dateDeleted',
      transform: (value: string) => new Date(value).toLocaleDateString()
    },
  ];

  return (
    <div className="container mx-auto ">
      <div className="">
        <TableExport 
          data={ userRoleList || []}
          columns={userRoleListColumns}
          filename="user-role-export"
        />
      </div>
    </div>
  );
}