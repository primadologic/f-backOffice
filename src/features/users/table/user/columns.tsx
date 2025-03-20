import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActionsCell } from "./actions"
import { formatDateTime } from "@/lib/custom"
import { UserType } from "@/common/Type/UserRole.type"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"



type RoleType = "admin" | "investigator" | "guest"
type UserIsActiveType = "true" | "false" 

const roleStyles: Record<RoleType, {bg: string, text: string}> = {
    admin: {
        bg: "bg-red-600",
        text: "text-white",
      },
    investigator: {
      bg: "bg-blue-600",
      text: "text-white",
    },
    guest: {
      bg: "bg-gray-400",
      text: "text-black",
    },

}

const userIsActiveStyles: Record<UserIsActiveType, {bg: string, text: string}> = {
    true: {
      bg: "bg-status-success_500",
      text: "text-[#ffffff]"   
    }, 
    false: {
      bg: "bg-status-primary_500",
      text: "text-[#ffffff]"
    }
  
  }
  


export const columns: ColumnDef<UserType>[] = [

    {
        id: "select",
        header: ({ table }) => (
        <Checkbox
            checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
        />
        ),
        cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className=""
        />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    // {
    //     accessorKey: "firstName",
    //     header: ("First Name"),
    //     cell: ({ row }) => row.original.firstName ?? "N/A",
    // },

    {
        id: "fullName",
        accessorFn: (row) => `${row.firstName} ${row.lastLogIn}`,
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => {column.toggleSorting(column.getIsSorted() === "asc") }}
                
              >
                Full Name
                <ArrowUpDown size={18} /> 
              </Button>
            )
        },
        
        cell: ({ row }) => {
            const { firstName, lastName, avatarUrl } = row.original;
    
            return (
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={avatarUrl ?? ""} alt={`${firstName} ${lastName}`} />
                        <AvatarFallback>
                            {firstName?.charAt(0)}
                            {lastName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <span>{`${firstName} ${lastName}`}</span>
                </div>
            );
        }
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        id: "roleName",
        accessorFn: (row) => row.role.roleName,
        header: "Role",
        cell: ({ row }) => {
            const role = row.original.role.roleName.toString() as RoleType

            if (!role) return "N/A";

            return (
                <div className="flex justify-start w-full min-w-[120px]">
                    <div className={`
                        inline-flex items-center justify-center px-2.5 py-0.5
                        rounded-full text-xs font-semibold whitespace-nowrap
                        ${roleStyles[role]?.bg || ""}
                        ${roleStyles[role]?.text || ""}
                    `}>
                        <span className="mr-1">&#9679;</span>
                        <span className="capitalize">{role}</span>
                    </div>

                </div>
            )
        }
    },
    {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => {
            const isActive = row.original.isActive?.toString() as UserIsActiveType

            if (!isActive) return "N/A";

            return (
                <div className="flex justify-start w-full min-w-[120px]">
                    <div className={`
                        inline-flex items-center justify-center px-2.5 py-0.5
                        rounded-full text-xs font-semibold whitespace-nowrap
                        ${userIsActiveStyles[isActive]?.bg || ""}
                        ${userIsActiveStyles[isActive]?.text || ""}
                    `}>
                        <span className="mr-1">&#9679;</span>
                        <span className="capitalize">{isActive}</span>
                    </div>

                </div>
            )
        }
    },
    {
        accessorKey: "lastLogIn",
        header: "Last Login",
        cell: ({ getValue }) => formatDateTime(getValue() as string)
    },
   
    {
        header: "Actions",
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ActionsCell userId={row.original} />,
    }
   
]



 // filterFn: (row, columnId, filterValue) => {
        //     const reportPlatform = row.original.reportPlatForm?.displayName ?? "";
        //     // const archived = row.original.archived ?? "";
        //     return (
        //         reportPlatform.toLowerCase().includes(filterValue.toLowerCase())
        //         // archived
        //     )
        // },
      