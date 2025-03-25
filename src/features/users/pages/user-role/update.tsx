import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { CustomCloseButton } from "@/components/custom-ui/custom-buttons";
import { useUserRoleStore } from "@/hooks/state/users/role.state";
import { UserRole } from "@/common/Type/UserRole.type";
import Loader from "@/components/custom-ui/loader";
import { useUpdateUserRoleService, useUserRoleDetailService,  } from "@/service/users/service";
import React from "react";

export default function UserRoleUpdateDialog() {
  const { isOpen, setIsOpen, selectedRoleId } = useUserRoleStore();

  const updateUserRoleMutation = useUpdateUserRoleService(selectedRoleId ?? "");
  const selectedRole = useUserRoleDetailService(selectedRoleId ?? "null");

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm<UserRole>({
    defaultValues: {
      roleName: "N/A",
      description: "N/A",
    },
    criteriaMode: "all",
  });

  // Effect to set default values when selectedRole data is available
  React.useEffect(() => {
    if (selectedRole.data?.data) {
      setValue("roleName", selectedRole.data.data.roleName);
      setValue("description", selectedRole.data.data.description);
    }
  }, [selectedRole.data, setValue]);

  const onSubmit = (data: any) => {
    console.log("Edit Fraud Number", data);
    updateUserRoleMutation.mutate({id: selectedRoleId ?? "", ...data})
  };

  if (selectedRole.isLoading) {
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
    <div className="">
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button className="sr-only">Open</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="flex !justify-start !items-start">
            <AlertDialogTitle>Update Role</AlertDialogTitle>
            <AlertDialogDescription>
              Make changes to the role here. Click save when you&apos;re done.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="status" className="form-label">
                    Role Name
                  </label>
                  <input
                    type="text"
                    placeholder="Role Name"
                    {...register("roleName")}
                    className="form-input disabled:cursor-not-allowed"
                  />
                  {/* {errors.roleName && <p className="form-error-msg">{errors.roleName.message}</p>} */}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="status" className="form-label">
                    Role Description
                  </label>
                  <input
                    type="text"
                    placeholder="Role Description"
                    {...register("description")}
                    className="form-input disabled:cursor-not-allowed"
                  />
                  {/* {errors.roleName && <p className="form-error-msg">{errors.roleName.message}</p>} */}
                </div>
              </div>

              <div className="w-full flex items-center sm:flex-row gap-x-6 gap-y-3 py-3 flex-col-reverse">
                <CustomCloseButton />

                <Button
                  type="submit"
                  className={`btn-default sm:min-w-[6.25rem] ${
                    updateUserRoleMutation.isPending
                      ? "sm:min-w-[6.25rem]"
                      : "sm:max-w-max w-full"
                  }`}
                >
                  {updateUserRoleMutation.isPending ? (
                    <span className="flex items-center justify-center sm:w-[6.25rem]">
                      <Loader />
                    </span>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}