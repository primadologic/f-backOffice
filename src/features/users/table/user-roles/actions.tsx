
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
import { toast } from "sonner";
import { useUserRoleDeleteStore, useUserRoleStore } from "@/hooks/state/users/role.state";
import { UserRole } from "@/common/Type/UserRole.type";
import { useUserRoleDetailService } from "@/service/users/service";



export const ActionsCell = ({ userRole }: { userRole: UserRole }) => {
    

  const { setIsOpen, setSelectedRoleId, selectedRoleId } = useUserRoleStore();
  const { setIsOpen: setIsOpenDelete, setSelectedRoleId: setSelectedRoleIdDelete, selectedRoleId: SelectedRoleIdDelete } = useUserRoleDeleteStore();
  const selectedRole = useUserRoleDetailService(selectedRoleId ?? 'null'); // Ensure null fallback

  const handleEditClick = () => {
    if (selectedRoleId) {
      setSelectedRoleId(userRole.id ?? null); // Ensure null fallback
      setIsOpen(true);
    }
  };

  const handleDeleteClick = () => {
    if (SelectedRoleIdDelete) {
      setSelectedRoleIdDelete(userRole.id ?? null); // Ensure null fallback
      setIsOpenDelete(true);
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
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleDeleteClick}
          className="space-x-1"
        >
          <span><Trash2 /></span>
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
