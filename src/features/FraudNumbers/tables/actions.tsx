
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
import { FraudNumberNewType } from "@/common/Type/FraudNumber/fraud-numbers";
import { useFraudNumberStore } from "@/hooks/state/fraud-numbers/fraudSheet.state";
import { useFraudNumberListService } from "@/service/fraud-numbers/service";


export const ActionsCell = ({ fraudNumber }: { fraudNumber: FraudNumberNewType }) => {
    
  const { setIsOpen, setSelectedFraudNumber } = useFraudNumberStore()

  const fraudNumberData = useFraudNumberListService();
  const response: FraudNumberNewType[] = fraudNumberData.data?.data ?? [];

  const currentFraudNumber = response.find((cf) => cf.fraudNumberId === fraudNumber.fraudNumberId);
  


  const handleEditClick = () => {
    if (currentFraudNumber) {
      setSelectedFraudNumber(currentFraudNumber)
      setIsOpen(true)
    }
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
