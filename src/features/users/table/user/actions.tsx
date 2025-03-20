
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
import { toast } from "sonner";
import { UserType } from "@/common/Type/UserRole.type";
import { useUserStore } from "@/hooks/state/users/user.state";


export const ActionsCell = ({ userId }: { userId: UserType }) => {
    
  const { setIsOpen, setSelectedUser } = useUserStore()

    
  
  const handleEditClick = () => {
    setSelectedUser(userId)
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
          onClick={() => {
            navigator.clipboard.writeText(userId.firstName + " " + userId.lastName);
            toast.info("Copied", {duration: 2000})
          }}
        >
          Copy Full name
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
