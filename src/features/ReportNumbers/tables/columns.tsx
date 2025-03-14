import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ReportList } from "@/data/ReportNumbers/ReportNumbers.type"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActionsCell } from "./actions"
import { formatDate, formatDateTime, maskNumber } from "@/lib/custom"




type ArchivedType = "true" | "false" 

const archivedStyles: Record<ArchivedType, {bg: string, text: string}> = {
  true: {
    bg: "bg-status-success_500",
    text: "text-[#ffffff]"    
  }, 
  false: {
    bg: "bg-status-primary_500",
    text: "text-[#ffffff]"
  }

}

export const columns: ColumnDef<ReportList>[] = [

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
        accessorKey: "reportPlatform",
        header: "Platform",
        cell: ({ row }) => row.original.reportPlatForm?.displayName ?? "N/A",
        // filterFn: (row, columnId, filterValue) => {
        //     const reportPlatform = row.original.reportPlatForm?.displayName ?? "";
        //     // const archived = row.original.archived ?? "";
        //     return (
        //         reportPlatform.toLowerCase().includes(filterValue.toLowerCase())
        //         // archived
        //     )
        // },
      

    },

    {
        accessorKey: "suspectNumber",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => {column.toggleSorting(column.getIsSorted() === "asc") }}
                
              >
                    Suspect Number
                    <ArrowUpDown size={18} /> 
              </Button>
            )
        },
        
        cell: ({ getValue }) => {

            const suspectNumber = maskNumber(getValue() as string) as string

            return (
                <span className="">{suspectNumber.substring(0, 12)}</span>
            )
        }
    },
    {
        accessorKey: "reporterNumber",
        header: "Reporter Number",
        cell: ({ getValue }) => {

            const reporterNumber = maskNumber(getValue() as string)

            return (
                <span>{reporterNumber.substring(0, 12)}</span>
            )
        }
    },
    {
        accessorKey: "incidentDate",
        header: "Incident Date",
        cell: ({ getValue }) => formatDate(getValue() as string)
    },
    {
        accessorKey: "createdAt",
        header: "Date Reported",
        cell: ({ getValue }) => formatDateTime(getValue() as string)
    },
    {
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
    },
    {
        header: "Actions",
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ActionsCell reportNumber={row.original} />,
    }
   
]

