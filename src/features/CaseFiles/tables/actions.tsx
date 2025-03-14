
import { Copy, Eye, MoreHorizontal, SquarePen, Trash2, UserRoundCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAssignInvestigatorStore, useUpdateCaseFileStore, useDeleteCaseFileStore, useDetailCaseFile,  } from "@/hooks/state/case-files/case-file-store";
import { CaseFileType } from "@/common/Type/CaseFile/CaseFile.type";
import { useNavigate } from "@tanstack/react-router";


export const ActionsCell = ({ caseFile }: { caseFile: CaseFileType }) => {
    
  const { setIsOpen, setSelectedCaseFile } = useUpdateCaseFileStore();
  const navigate = useNavigate()
  
  const { setIsOpen: setIsDeleteOpen, setSelectedCaseFile: setSelectedDeleteCaseFile } = useDeleteCaseFileStore();
  const { setIsOpen: setIsAssignOpen, setSelectedCaseFile: setSelectedAssignCaseFile } = useAssignInvestigatorStore();

  const {  setSelectedCaseFile: setDetailSelectedCaseFile, selectedCaseFile: detailSelectedCaseFile } = useDetailCaseFile();
  
  const handleEditClick = () => {
    setSelectedCaseFile(caseFile);
    setIsOpen(true);
  };

  const handleDeleteClick = () => {
    setSelectedDeleteCaseFile(caseFile);
    setIsDeleteOpen(true);
  };

  const handleAssignInvestigator = () => {
    setSelectedAssignCaseFile(caseFile);
    setIsAssignOpen(true)
  }

  
  const handleNavigate = () => {
    setDetailSelectedCaseFile(caseFile);
    const caseFileId = detailSelectedCaseFile?.caseId ?? ""
    navigate({ to: '/dashboard/case-files/$caseId', params: { caseId: caseFileId }  })
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
          onClick={handleNavigate}
          className="space-x-1"
        >
          <span><Eye /></span>
          <span>View</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={handleAssignInvestigator}
          className="space-x-1"
        >
          <span><UserRoundCheck /></span>
          <span>Assign Investigator</span>
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
