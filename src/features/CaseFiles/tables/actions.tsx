
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

import { useNavigate } from "@tanstack/react-router";
import { useCaseFileListService } from "@/service/case-files/service";
import { CaseFileType } from "@/common/Type/CaseFile/CaseFile.type";
import { toast } from "sonner";



export const ActionsCell = ({ caseFile }: { caseFile: CaseFileType }) => {
    
  const { setIsOpen, setSelectedCaseFile } = useUpdateCaseFileStore();
  const navigate = useNavigate()
  
  const { setIsOpen: setIsDeleteOpen, setSelectedCaseFile: setSelectedDeleteCaseFile } = useDeleteCaseFileStore();
  const { setIsOpen: setIsAssignOpen, setSelectedCaseFile: setSelectedAssignCaseFile } = useAssignInvestigatorStore();

  const {  setSelectedCaseFile: setDetailSelectedCaseFile } = useDetailCaseFile();

  // Fetch case file list data
  const caseFileListData = useCaseFileListService();
  const caseFileData: CaseFileType[] = caseFileListData.data?.data ?? [];

  // Find the matching case file in the list
  const currentCaseFile = caseFileData.find((cf) => cf.caseId === caseFile.caseId);

  
  const handleEditClick = () => {
    if (currentCaseFile) {
      setSelectedCaseFile(currentCaseFile);
      setIsOpen(true);
    }
   
  };

  const handleDeleteClick = () => {
    if (currentCaseFile) {
      setSelectedDeleteCaseFile(currentCaseFile);
      setIsDeleteOpen(true);
    }
  
  };

  const handleAssignInvestigator = () => {
    if (currentCaseFile) {
      setSelectedAssignCaseFile(caseFile);
      setIsAssignOpen(true)
    }
  }

  
  const handleNavigate = () => {
    if (currentCaseFile) {
      setDetailSelectedCaseFile(currentCaseFile);
      navigate({ to: `/dashboard/case-files/${currentCaseFile.caseId}` });
    }
  };


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
          onClick={() => {
            navigator.clipboard.writeText(caseFile.suspectNumber)
              toast.info("Copied", {duration: 2000})
          }}
          className="space-x-1 cursor-pointer"
        >
          <span><Copy /></span>
          <span>Copy suspect number</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={handleEditClick}
          className="space-x- cursor-pointer"
        >
          <span><SquarePen /></span>
          <span>Edit</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={handleNavigate}
          className="space-x- cursor-pointer"
        >
          <span><Eye /></span>
          <span>View</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={handleAssignInvestigator}
          className="space-x-1 cursor-pointer"
        >
          <span><UserRoundCheck /></span>
          <span>Assign Investigator</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
            onClick={handleDeleteClick}
            className="space-x-1 cursor-pointer"
        >
         <span><Trash2 /></span>
         <span>Remove</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
