'use client'
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ReportNumberType } from "@/data/ReportNumbers/ReportNumbers.type";
import { useReportNumberStore } from "@/hooks/state/reports/sideSheet";


export const ActionsCell = ({ reportNumber }: { reportNumber: ReportNumberType }) => {
    
    const { setIsOpen, setSelectedReportNumber } = useReportNumberStore()
  
  const handleEditClick = () => {
    setSelectedReportNumber(reportNumber)
    setIsOpen(true)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(reportNumber.reporterNumber)}
        >
          Copy reporter number
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
            onClick={handleEditClick}
        >
          View
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
