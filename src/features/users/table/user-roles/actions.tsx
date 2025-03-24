
import { Copy, MoreHorizontal, SquarePen } from "lucide-react";
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
import { useUserRoleStore } from "@/hooks/state/users/role.state";
import { UserRole } from "@/common/Type/UserRole.type";
import { useUserRoleDetails } from "@/service/users/service";



export const ActionsCell = ({ userRole }: { userRole: UserRole }) => {
    

  const { setIsOpen, setSelectedRoleId, selectedRoleId } = useUserRoleStore();
  const selectedRole = useUserRoleDetails(selectedRoleId ?? 'null'); // Ensure null fallback

  const handleEditClick = () => {
    setSelectedRoleId(userRole.id ?? null); // Ensure null fallback
    setIsOpen(true);
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
            navigator.clipboard.writeText(selectedRole.data?.data?.roleName || "");
            toast.info("Copied", {duration: 2000})
          }}
          className="space-x-1"
        >
          <span><Copy /></span>
         <span>Copy role name</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleEditClick}
          className="space-x-1"
        >
          <span><SquarePen /></span>
          <span>Edit</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
