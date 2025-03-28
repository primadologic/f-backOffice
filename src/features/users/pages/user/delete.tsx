
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Loader from "@/components/custom-ui/loader"
import { CustomCloseButton } from "@/components/custom-ui/custom-buttons"
import { useDeleteUserStore } from "@/hooks/state/users/user.state"
import { useDeleteUserService, useGetUserDetails } from "@/service/users/service"



export default function DeleteUserDialog() {

    const { isOpen, setIsOpen, selectedUser } = useDeleteUserStore();

    // Service Hooks
    const getUserData = useGetUserDetails(selectedUser || "defaultUser");

    const deleteUserMutation = useDeleteUserService(selectedUser ?? 'null')

    const deleteHandler = () => {
        deleteUserMutation.mutateAsync()  
    };

    
    if (getUserData.isLoading) {
      return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <div className="flex justify-center items-center h-48">
              <Loader />
            </div>
          </AlertDialogContent>
        </AlertDialog>
      );
    }
    


    return (
        <>
            <AlertDialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <AlertDialogTrigger className="sr-only">
                    Edit
                </AlertDialogTrigger>
                <AlertDialogContent className="">
                    <AlertDialogHeader className="w-full flex flex-col space-y-1 !justify-start !items-start">
                        <AlertDialogTitle className="text-left">Are you sure you want to delete this user?</AlertDialogTitle>
                        <AlertDialogDescription className="text-left space-y-2">
                            <span>This action cannot be undone.</span> {" "}
                            <span>This will <span>permanently</span> delete this record and remove the data from the database</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="">
                        <div className="max-w-max">
                            <div className="flex flex-col gap-y-1">
                                <div className="flex flex-row gap-3">
                                    <p className="form-label">Full Name:</p>
                                    <data 
                                        value={getUserData?.data?.data?.firstName || "N/A" + " " + getUserData?.data?.data?.lastName || "N/A"}
                                        className="custom-txt"
                                    >
                                        {getUserData?.data?.data?.firstName + " " + getUserData?.data?.data?.lastName || "N/A"} 
                                    </data>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <p className="form-label">User's Role</p>
                                    <data 
                                        value={getUserData?.data?.role?.roleName || "N/A"}
                                        className="custom-txt capitalize"
                                    >
                                        {getUserData?.data?.data?.role?.roleName || "N/A"}
                                    </data>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div className="w-full flex sm:flex-row gap-x-6 gap-y-3 py-3 flex-col-reverse">
                        <CustomCloseButton />
                        <Button
                            type="button"
                            variant={"destructive"}
                            onClick={deleteHandler}
                            className={`btn-default sm:min-w-[6.25rem]  ${
                                deleteUserMutation.isPending ? "sm:min-w-[6.25rem]" : "sm:max-w-max w-full"
                            }`}
                        >
                            {deleteUserMutation.isPending ? (
                                <span className="flex items-center justify-center sm:w-[6.25rem]"> 
                                    {/* Ensure the span has the desired width */}
                                    <Loader />
                                </span>
                            ) : (
                                <span>Confirm</span>
                            )}
                        </Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
            
        </>
    )
    
};
