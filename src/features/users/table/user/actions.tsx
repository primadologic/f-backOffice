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
  const selectedRole = useUserRoleDetails(selectedRoleId ?? "null");

  const handleEditClick = () => {
    setSelectedRoleId(userRole.id ?? null);
    setIsOpen(true);
  };

  const handleCopyClick = () => {
      if(selectedRole.data?.data?.roleName){
        navigator.clipboard.writeText(selectedRole.data.data.roleName);
        toast.info("Copied", { duration: 2000 });
      } else {
        toast.error("Role Name not available", {duration: 2000})
      }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleCopyClick} className="space-x-1">
          <Copy className="h-4 w-4" />
          Copy role name
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEditClick} className="space-x-1">
          <SquarePen className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ... (Your zustand store remains the same)