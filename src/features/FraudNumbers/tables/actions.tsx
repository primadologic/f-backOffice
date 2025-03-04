
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
import { FraudNumberType } from "@/common/Type/FraudNumber/FraudNumber.type";
import { useFraudNumberStore } from "@/hooks/state/fraud-numbers/fraudSheet.state";


export const ActionsCell = ({ fraudNumber }: { fraudNumber: FraudNumberType }) => {
    
    const { setIsOpen, setSelectedFraudNumber } = useFraudNumberStore()
  
  const handleEditClick = () => {
    setSelectedFraudNumber(fraudNumber)
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
          onClick={() => navigator.clipboard.writeText(fraudNumber.fraudNumber)}
        >
          Copy fraud number
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
            onClick={handleEditClick}
        >
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
