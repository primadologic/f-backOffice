
import { AssignInvestigatorType } from "@/common/Type/CaseFile/CaseFile.type"
import { UserDetailType } from "@/common/Type/user.type"
import { CustomCloseButton } from "@/components/custom-ui/custom-buttons"
import Loader from "@/components/custom-ui/loader"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
  
import { useAssignInvestigatorStore } from "@/hooks/state/case-files/case-file-store"
import { useAssignInvestigatorService } from "@/service/case-files/service"
import { useUsers } from "@/service/users/service"
import { Controller, useForm } from "react-hook-form"




export default function AssignInvestigatorDialog() {

    const { handleSubmit, control, formState: { errors } } = useForm<AssignInvestigatorType>({
        criteriaMode: 'all',
        mode: 'onChange'
    })

    const { isOpen, setIsOpen, selectedCaseFile } = useAssignInvestigatorStore();

    const caseId= selectedCaseFile?.caseId

    const getusers = useUsers().data
    const users: UserDetailType[] = getusers?.data || [];

    const assignInvestigatorMutation = useAssignInvestigatorService({ caseId })

    const onSubmit = (data: AssignInvestigatorType) => {
        // console.log("Assign investigator", {
        //     "investigator": data.investigatorId
        // });

        assignInvestigatorMutation.mutateAsync({
            investigatorId: data.investigatorId
        })
    }

    return (
        <div className="">
            <AlertDialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <AlertDialogTrigger className="sr-only">
                    Edit
                </AlertDialogTrigger>
                <AlertDialogContent className="">
                    <AlertDialogHeader className="w-full flex flex-col !justify-start !items-start">
                        <AlertDialogTitle className="text-left">
                            Assign or Update Investigator
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-left">Make changes to the case here. Click save when you're done.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="mt-5 w-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                            
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="status" className="form-label">
                                   Investigator
                                </label>

                                <Controller
                                    name="investigatorId"
                                    control={control}
                                    defaultValue={selectedCaseFile?.investigator?.userId}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Investigator ID is required"
                                        }
                                    }}
                                    render={({ field: { onBlur, value, onChange } }) => (
                                        <Select
                                            value={value}
                                            onValueChange={onChange}
                                            defaultValue={selectedCaseFile?.investigator?.userId}
                                        >
                                            <SelectTrigger 
                                                    onBlur={onBlur}
                                                    className={` outline-none border py-3 px-3 !w-full  text-sm font-medium text-custom_theme-primary_foreground dark:bg-custom_theme-dark_gray_1 dark:text-custom_theme-primary_background focus:ring-1 focus:ring-gray-400 dark:focus:ring-custom_theme-gray delay-150 transition ease-in-out duration-300
                                                    ${errors.investigatorId ? "form-validerr-ring " : "form-valid-ring"}
                                                `}>
                                               <SelectValue placeholder="Select investigator" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users.map((user) => (
                                                    <SelectItem key={user.userId} value={user.userId}>
                                                        {user.firstName} {user.lastName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.investigatorId && <p className="form-error-msg">{errors.investigatorId.message}</p>}
                            </div>
                           
                            <div className="w-full flex sm:flex-row gap-x-6 gap-y-3 py-3 flex-col-reverse">
                                <Button  
                                    type="submit" 
                                    className={`btn-default sm:min-w-[100px] w-full ${assignInvestigatorMutation.isPending ? "" : "max-w-max"}`}
                                >
                                    {assignInvestigatorMutation.isPending ? (
                                        <span className="flex items-center justify-center sm:w-[6.25rem] w-full"> 
                                            <Loader /> 
                                        </span>
                                    ) : (
                                        <span>Save Changes</span>
                                    )}
                                </Button>
                                <CustomCloseButton />
                            </div>
                        </form>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}