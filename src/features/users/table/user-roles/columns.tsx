import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActionsCell } from "./actions"
import { formatDateTime } from "@/lib/custom"
import { UserRole } from "@/common/Type/UserRole.type"




type RoleType = "admin" | "investigator" | "guest"

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

export const columns: ColumnDef<UserRole>[] = [

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

    {
        id: "roleName",
        accessorFn: (row) => row.roleName,
        header: "Role",
        cell: ({ row }) => {
            const role = row.original.roleName.toString() as RoleType

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
        accessorKey: "description",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => {column.toggleSorting(column.getIsSorted() === "asc") }}
                
              >
                    Desciption
                    <ArrowUpDown size={18} /> 
              </Button>
            )
        },
        
        cell: ({ getValue }) => {

            const description = (getValue() as string) as string

            if (description === null) return "-";

            return (
                <span className="">{description}</span>
            )
        }
    },
    {
        accessorKey: "dateCreated",
        header: "Date Created",
        cell: ({ getValue }) => {

            const dateCreated = formatDateTime(getValue() as string)

            return (
                <span>{dateCreated}</span>
            )
        }
    },
    {
        accessorKey: "dateUpdated",
        header: "Date Updated",
        cell: ({ getValue }) => formatDateTime(getValue() as string)
    },
    {
        accessorKey: "createdAt",
        header: "Date Reported",
        cell: ({ getValue }) => formatDateTime(getValue() as string)
    },
    {
        accessorKey: "dateDeleted",
        header: "Date Deleted",
        cell: ({ getValue }) => formatDateTime(getValue() as string)
    },

   /*  {
        accessorKey: "archived",
        header: "Archived",
        cell: ({ row }) => {
            const archive = row.original.archived.toString() as ArchivedType

            if (!archive) return "N/A";

            return (
                <div className="flex justify-start w-full min-w-[120px]">
                    <div className={`
                        inline-flex items-center justify-center px-2.5 py-0.5
                        rounded-full text-xs font-semibold whitespace-nowrap
                        ${archivedStyles[archive]?.bg || ""}
                        ${archivedStyles[archive]?.text || ""}
                    `}>
                        <span className="mr-1">&#9679;</span>
                        <span className="capitalize">{archive}</span>
                    </div>

                </div>
            )
        }
    }, */
    {
        header: "Actions",
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ActionsCell userRole={row.original } />,
    }
   
]

