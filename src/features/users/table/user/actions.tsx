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
import { useGetUserDetails } from "@/service/users/service";
import { useDeleteUserStore, useUserStore } from "@/hooks/state/users/user.state";
import { UserType } from "@/common/Type/UserRole.type";
import { useNavigate } from "@tanstack/react-router";

export const ActionsCell = ({ user }: { user: UserType }) => {
  const { setSelectedUser, selectedUser } = useUserStore();
  const { setIsOpen: setIsOpenDelete, setSelectedUser: setSelectedDeleteUser } = useDeleteUserStore();
  const selectedUserId = useGetUserDetails(selectedUser ?? "defaultUserId");

  const navigate = useNavigate()

  const handleEditClick = () => {
    setSelectedUser(user.userId);
    navigate({ to: `/users/edit/${user.userId}`, params: { userId: user.userId } });
  };

  const handleCopyClick = () => {
    if (selectedUserId.data?.data?.userId) {
      navigator.clipboard.writeText(
        selectedUserId.data?.data?.firstName +
          " " +
          selectedUserId.data?.data?.lastName
      );
      toast.info("Copied", { duration: 2000 });
    } else {
      toast.error("User unavailable", { duration: 2000 });
    }
  };

  const handleDeleteClick = () => {
    setSelectedDeleteUser(user.userId)
    setIsOpenDelete(true)
  }

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
        <DropdownMenuItem 
          onClick={handleCopyClick} 
          className="space-x-1"
      >
          <Copy className="h-4 w-4" />
          Copy full name
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleEditClick} 
          className="space-x-1"
        >
          <SquarePen className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleDeleteClick} 
          className="space-x-1"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ... (Your zustand store remains the same)