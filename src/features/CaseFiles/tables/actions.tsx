
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
import { useAssignInvestigatorStore, useDeleteCaseFileStore, useCaseFileStore, useDetailCaseFileStore,  } from "@/hooks/state/case-files/case-file-store";
import { useNavigate } from "@tanstack/react-router";
import { CaseFileType } from "@/common/Type/CaseFile/CaseFile.type";
import { toast } from "sonner";



export const ActionsCell = ({ caseFile }: { caseFile: CaseFileType }) => {
    
  const { setIsOpen, setSelectedCaseFile } = useCaseFileStore();  
  const navigate = useNavigate();
  
  const { setIsOpen: setIsDeleteOpen, setSelectedCaseFile: setSelectedDeleteCaseFile } = useDeleteCaseFileStore();
  const { setIsOpen: setIsAssignOpen, setSelectedCaseFile: setSelectedAssignCaseFile } = useAssignInvestigatorStore();

  const {  setSelectedCaseFile: setDetailSelectedCaseFile } = useDetailCaseFileStore();

  const caseId = caseFile.caseId ?? 'undefined'
  
  const handleEditClick = () => {
    if (caseId === "undefined") {
      toast.info("Sorry, an error occurred");
    } else {
      setSelectedCaseFile(caseFile?.caseId);
      setIsOpen(true);
    }
  };


  const handleDeleteClick = () => {
    if (!caseFile?.caseId) {
      toast.info("Sorry, an error occurred")
    } else {
      setSelectedDeleteCaseFile(caseFile?.caseId);
      setIsDeleteOpen(true);
    }
  };

  const handleAssignInvestigator = () => {
    if (!caseFile?.caseId) {
      toast.info("Sorry, an error occurred");
    } else {
      setSelectedAssignCaseFile(caseFile?.caseId);
      setIsAssignOpen(true)
    }
  }

  
  const handleNavigate = () => {
    if (!caseFile?.caseId) {
      toast.info("Sorry, an error occurred");
    } else {
      setDetailSelectedCaseFile(caseFile?.caseId);
      navigate({ to: `/dashboard/case-files/$caseId`, params: { caseId: caseFile?.caseId } });
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
          className="space-x-1 cursor-pointer"
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
