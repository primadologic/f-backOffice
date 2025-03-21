
// import { useQuery } from "@tanstack/react-query";

import { ApiResponse } from "@/common/api-response.type";
import { UserType } from "@/common/Type/UserRole.type";
import TableExport from "@/components/custom-ui/table-export";
// import { getData } from "@/service/report-number.service";
import { useUsers } from "@/service/users/service";



// Your existing getData function...

export default function UserListExport() {


  const { data: userData } = useUsers() as {
    data: ApiResponse
  }

  const userList: UserType[] = userData?.data || []



  const userListColumns = [
    {
      label: 'User Id',
      value: 'reportId'
    },
    {
      label: 'First Name',
      value: 'firstName'
    },
    {
      label: 'Last Name',
      value: 'lastName'
    },
    {
      label: 'Email',
      value: 'email',
    },
    {
      label: 'Last Login',
      value: 'lastLogin',
      transform: (value: string) => new Date(value)?.toLocaleDateString()
    },
    {
      label: 'Last Activity',
      value: 'lastActivity',
      transform: (value: string) => new Date(value)?.toLocaleDateString()
    },
    {
      label: 'Avatar URL',
      value: 'avatarUrl'
    },
    {
      label: 'Last Assigned',
      value: 'lastAssigned'
    },
    {
      label: 'Role',
      value: 'role.roleName',
      transform: (value: string) => {
        return value.toString()
      }
    },
    {
      label: 'Date Created',
      value: 'dateCreated',
      transform: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      label: 'Date Updated',
      value: 'dateUpdated',
      transform: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      label: 'Date Deleted',
      value: 'dateDeleted',
      transform: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  return (
    <div className="container mx-auto ">
      <div className="">
        <TableExport 
          data={userList || []}
          columns={userListColumns}
          filename="report-numbers-export"
        />
      </div>
    </div>
  );
}