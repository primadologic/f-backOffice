import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useAccessRoleStore } from "@/hooks/state/RBAC/alert-dialog.store";



export default function RoleAccessAlterDialog() {
  const { isOpen, title, description, onConfirm, closeDialog } = useAccessRoleStore()

  return (
    <AlertDialog open={isOpen} onOpenChange={closeDialog}>
      <AlertDialogTrigger asChild />
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
          {onConfirm && (
            <AlertDialogAction
              onClick={() => {
                onConfirm(); // Call the function passed in openDialog
                closeDialog();
              }}
            >
              Confirm
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
