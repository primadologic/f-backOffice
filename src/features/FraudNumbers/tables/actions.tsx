
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
import { FraudNumberNewType } from "@/common/Type/FraudNumber/fraud-numbers";
import { useDeleteFraudNumberStore, useFraudNumberStore } from "@/hooks/state/fraud-numbers/fraudSheet.state";
import { toast } from "sonner";


export const ActionsCell = ({ fraudNumber }: { fraudNumber: FraudNumberNewType }) => {
    
  const { setIsOpen, setSelectedFraudNumber } = useFraudNumberStore();

  const { setIsOpen: setIsDeleteOpen, setSelectedFraudNumber: setDeletedFraudNumber } = useDeleteFraudNumberStore();

  const fraudNumberId = fraudNumber?.fraudNumberId ?? 'undefined';


  const handleEditClick = () => {
    if (fraudNumberId === 'undefined') {
      setIsOpen(false)
    } else {
      setSelectedFraudNumber(fraudNumberId)
      setIsOpen(true)
    }
  }

  
  const handleDeleteClick = () => {
    if (fraudNumberId === 'undefined') {
      setIsDeleteOpen(false);
    } else {
      setDeletedFraudNumber(fraudNumberId);
      setIsDeleteOpen(true)
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
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(fraudNumber.fraudNumber);
            toast.info("Copied", {duration: 2000})
          }}
          className="space-x-1 cursor-pointer"
        >
          <span><Copy /></span>
          <span>Copy fraud number</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleEditClick} className="space-x- cursor-pointer">
          <span><SquarePen /></span>
          <span>Edit</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleDeleteClick} className="space-x-1 cursor-pointer">
          <span><Trash2 /></span>
          <span>Remove</span>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};
