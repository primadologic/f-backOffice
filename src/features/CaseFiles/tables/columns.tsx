

import { ColumnDef } from "@tanstack/react-table"
import { ActionsCell } from "./actions"
import { CaseFileType } from "@/common/Type/CaseFile/CaseFile.type"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@radix-ui/react-checkbox"
import { formatDateTime, maskNumber } from "@/lib/custom"




type StatusType = "opened" | "investigation" | "review" | "approved" | "closed" | "archived"

const statusStyles: Record<StatusType, {bg: string, text: string}> = {
  opened: {
    bg: "bg-[#89CFF0]",
    text: "text-[#1a365d]"     // Dark blue text
  },
  investigation: {
    bg: "bg-[#FFF266]",
    text: "text-[#744210]"     // Dark brown text
  },
  review: {
    bg: "bg-[#005CE8]",
    text: "text-[#ffffff]"     // White text
  },
  approved: {
    bg: "bg-[#0FAF62]",
    text: "text-[#ffffff]"     // Dark green text
  },
  closed: {
    bg: "bg-[#FFB6C1]",
    text: "text-[#742a2a]"     // Dark red text
  },
  archived: {
    bg: "bg-[#795548]",         // B0C4DE
    text: "text-[#fff]"     // Dark gray text
  }
}

export const columns: ColumnDef<CaseFileType>[] = [

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
    accessorKey: "suspectNumber",
    header: "Suspect Number",
    cell: ({ getValue }) => maskNumber(getValue() as string),
  },
  {
    accessorKey: "investigator",
    // header: "Investigator",
    cell: ({ row }) => row.original.investigator?.firstName ?? "N/A",
    filterFn: (row, columnId, filterValue) => {
      const firstName = row.original.investigator?.firstName ?? "";
      const lastName =  row.original.investigator?.lastName ?? "";
      return (
        firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
        lastName.toLowerCase().includes(filterValue.toLowerCase())
      )
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          
        >
          Investigator
          <ArrowUpDown size={18} /> 
        </Button>
      )
    }
  },
  {
    accessorKey: "remark",
    header: "Remarks",
    cell: ({ row }) => {
      const remarks = row.original?.remark
        if (!remarks) return "N/A";
      
        return (
          <span className="">{ remarks.slice(0, 40) }...</span>
        )
    }
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      const createdAt = row.original?.createdAt;
      
      if (!createdAt) return "N/A";

      return formatDateTime(createdAt);
    }

  },
  {
    accessorKey: "status",
    header: "Status",
    // cell: ({ row }) => row.original.status?.name ?? "N/A",
    cell: ({ row }) => {

        const status = row.original.status?.name?.toLowerCase() as StatusType
        
        if (!status) return "N/A"

        return (
          <div className="flex justify-start w-full min-w-[120px]">
            <div className={`
              inline-flex items-center justify-center px-2.5 py-0.5 
              rounded-full text-xs font-semibold whitespace-nowrap
              ${statusStyles[status]?.bg || "bg-gray-500"}
              ${statusStyles[status]?.text || "text-gray-900"}
              font-medium
            `}>
              <span className="mr-1">&#9679;</span>
              <span className="capitalize">{status}</span>
              {/* <Badge>{status}</Badge> */}
            </div>
          </div>
        )
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;  // Show all when no filter is applied
      return row.original.status?.name === filterValue;
    }
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell caseFile={row.original} />,
  }

]
