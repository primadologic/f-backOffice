import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActionsCell } from "./actions"
import { FraudNumberNewType } from "@/common/Type/FraudNumber/fraud-numbers"
import { maskNumber } from "@/lib/custom"



type ApproveType = "true" | "false" 
type RiskLevelType = "low" | "medium" | "high"
type VisibilityType = "true" | "false" 
type InvestigatedType = "true" | "false" 



const approvedStyles: Record<ApproveType, {bg: string, text: string}> = {
  true: {
    bg: "bg-status-success_500",
    text: "text-[#ffffff]"   
  }, 
  false: {
    bg: "bg-status-primary_500",
    text: "text-[#ffffff]"
  }

};


const visibilityStyles: Record<VisibilityType, {bg: string, text: string}> = {
  true: {
    bg: "bg-status-success_500",
    text: "text-[#ffffff]"   
  }, 
  false: {
    bg: "bg-status-primary_500",
    text: "text-[#ffffff]"
  }

};

const investigatedStyles: Record<InvestigatedType, {bg: string, text: string}> = {
  true: {
    bg: "bg-status-success_500",
    text: "text-[#ffffff]"   
  }, 
  false: {
    bg: "bg-status-primary_500",
    text: "text-[#ffffff]"
  }

}


const rickLevelStyles: Record<RiskLevelType, {bg: string, text: string}> = {
  low: {
    bg: "bg-status-success_500 opacity-75",
    text: "text-[#ffffff]"   
  }, 
  medium: {
    bg: "bg-status-warning_100 opacity-80",
    text: "text-[#ffffff]"
  },
  high: {
    bg: "bg-status-danger_100",
    text: "text-[#ffffff]"
  }

}




export const columns: ColumnDef<FraudNumberNewType>[] = [

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
        accessorKey: "fraudNumber",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => {column.toggleSorting(column.getIsSorted() === "asc") }}
              >
                    Fraud Number
                    <ArrowUpDown size={18} /> 
              </Button>
            )
        },
        cell: ({ getValue }) => {

            const fraudNumber = maskNumber(getValue() as string)

            return (
                <span>{fraudNumber.substring(0, 12)}</span>
            )
        },

        filterFn: (row, columnId, filterValue) => {
            const fraudNumber = row.original.fraudNumber ?? "";
            // const archived = row.original.archived ?? "";
            return (

                fraudNumber.toLowerCase().includes(filterValue.toLowerCase())
                // archived
            )
        },
    },

    {
        accessorKey: "visibility",
        header: "Visibility",
        cell: ({ row }) => {
            const visibility = row.original.visibility.toString() as VisibilityType;

            if (!visibility) return "N/A";

            return (
                <div className="flex justify-start w-full min-w-[120px]">
                    <div className={`
                        inline-flex items-center justify-center px-2.5 py-0.5
                        rounded-full text-xs font-semibold whitespace-nowrap
                        ${visibilityStyles[visibility]?.bg || ""}
                        ${visibilityStyles[visibility]?.text || "" }
                    `}>
                        <span className="mr-1">&#9679;</span>
                        <span className="capitalize">{visibility}</span>
                    </div>

                </div>
            )
        }
    },
    {
        accessorKey: "reported",
        header: "Investigated",
        cell: ({ row }) => {
            const investigated = row.original.investigated.toString() as InvestigatedType;

            if (!investigated) return "N/A";

            return (
                <div className="flex justify-start w-full min-w-[120px]">
                    <div className={`
                        inline-flex items-center justify-center px-2.5 py-0.5
                        rounded-full text-xs font-semibold whitespace-nowrap
                        ${investigatedStyles[investigated]?.bg || ""}
                        ${investigatedStyles[investigated]?.text || "" }
                    `}>
                        <span className="mr-1">&#9679;</span>
                        <span className="capitalize">{investigated}</span>
                    </div>

                </div>
            )
        }
    },
    {
        accessorKey: "approved",
        header: "Approved",
        cell: ({ row }) => {
            const approved = row.original.approved.toString() as ApproveType;

            if (!approved) return "N/A";

            return (
                <div className="flex justify-start w-full min-w-[120px]">
                    <div className={`
                        inline-flex items-center justify-center px-2.5 py-0.5
                        rounded-full text-xs font-semibold whitespace-nowrap
                        ${approvedStyles[approved]?.bg || ""}
                        ${approvedStyles[approved]?.text || "" }
                    `}>
                        <span className="mr-1">&#9679;</span>
                        <span className="capitalize">{approved}</span>
                    </div>

                </div>
            )
        }
    },
    {
        accessorKey: "riskLevel",
        header: "Risk Level",
        cell: ({ row }) => {
            const riskLevel = row.original.riskLevel?.name.toString() as RiskLevelType

            if (!riskLevel) return "N/A";

            return (
                <div className="flex justify-start w-full min-w-[120px]">
                    <div className={`
                        inline-flex items-center justify-center px-2.5 py-0.5
                        rounded-full text-xs font-semibold whitespace-nowrap
                        ${rickLevelStyles[riskLevel]?.bg || ""}
                        ${rickLevelStyles[riskLevel]?.text || "" }
                    `}>
                        <span className="mr-1">&#9679;</span>
                        <span className="capitalize">{riskLevel}</span>
                    </div>

                </div>
            )
        }
    },
    {
        header: "Actions",
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ActionsCell fraudNumber={row.original} />,
      }
   
]

