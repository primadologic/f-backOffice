
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
import { UserType } from "@/common/Type/UserRole.type";
import { useDeleteUserStore, useUpdateUserStore } from "@/hooks/state/users/user.state";
import { useNavigate } from "@tanstack/react-router";


export const ActionsCell = ({ userId }: { userId: UserType }) => {
    
  const { setSelectedUser} = useUpdateUserStore();
  const { setSelectedUser: setSelectDeletedUser, setIsOpen: setIsOpenDeletedUser} = useDeleteUserStore();
  const navigate = useNavigate()
  
  const handleEditClick = () => {
    if (userId.userId) {
      setSelectedUser(userId)
      navigate({ to: `/users/edit/${userId.userId}` });
    }
  }

  const handleDeleteClick = () => {
    if (userId.userId) {
      setSelectDeletedUser(userId)
      setIsOpenDeletedUser(true)
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
          onClick={() => {
            navigator.clipboard.writeText(userId?.firstName + " " + userId?.lastName);
            toast.info("Copied", {duration: 2000})
          }}
        >
          <span><Copy /></span>
          Copy Full name
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
