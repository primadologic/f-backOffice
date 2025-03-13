
import { Copy, MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useCaseFileStore, useDeleteCaseFileStore } from "@/hooks/state/case-files/case-file-stiore";
import { CaseFileType } from "@/common/Type/CaseFile/CaseFile.type";


export const ActionsCell = ({ caseFile }: { caseFile: CaseFileType }) => {
    
  const { setIsOpen, setSelectedCaseFile } = useCaseFileStore();
  
  const { setIsOpen: setIsDeleteOpen, setSelectedCaseFile: setSelectedDeleteCaseFile } = useDeleteCaseFileStore();
  
  const handleEditClick = () => {
    setSelectedCaseFile(caseFile)
    setIsOpen(true)
  }

  const handleDeleteClick = () => {
    setSelectedDeleteCaseFile(caseFile)
    setIsDeleteOpen(true)
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
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(caseFile.suspectNumber)}
          className="space-x-1"
        >
          <span><Copy /></span>
          <span>Copy suspect number</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={handleEditClick}
          className="space-x-1"
        >
          <span><SquarePen /></span>
          <span>Edit</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
            onClick={handleDeleteClick}
            className="space-x-1"
        >
         <span><Trash2 /></span>
         <span>Remove</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
