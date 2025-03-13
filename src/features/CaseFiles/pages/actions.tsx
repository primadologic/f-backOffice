'use client'
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CaseFileType } from "@/common/Type/CaseFile/CaseFile.type";
import { useCaseFileStore } from "@/hooks/state/case-files/case-file-stiore";


export const ActionsCell = ({ caseFile }: { caseFile: CaseFileType }) => {
    
    const { setIsOpen, setSelectedCaseFile } = useCaseFileStore()
  
  const handleEditClick = () => {
    setSelectedCaseFile(caseFile)
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
          onClick={() => navigator.clipboard.writeText(caseFile.suspectNumber)}
        >
          Copy suspect number
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
            onClick={handleEditClick}
              className="space-x-3"
        >
          Edit case file
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
            // onClick={handleEditClick}
            className="space-x-3"
        >
         <span><Trash2 /></span>
         <span>Remove</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
