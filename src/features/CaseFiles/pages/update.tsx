
import { Button } from "@/components/ui/button"
import { useCaseFileStore } from "@/hooks/state/case-files/case-file-stiore"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Controller, useForm } from "react-hook-form"
import { CaseFileStatusType, CaseFileType, EditCaseFileType } from "@/common/Type/CaseFile/CaseFile.type"
import { useCaseFileStatusService, useUpdateCaseFileService,  } from "@/service/case-files/service"
import { useUsers } from "@/service/users/service"
import { UserDetailType } from "@/common/Type/user.type"
import Loader from "@/components/custom-ui/loader"
import { CustomCloseButton } from "@/components/custom-ui/custom-buttons"





export default function UpdateCaseFileDialog() {
    
    const { register, handleSubmit, control, formState: { errors } } = useForm<EditCaseFileType & CaseFileType>({
        criteriaMode: "firstError"
    })

 

    const { isOpen, selectedCaseFile, setIsOpen } = useCaseFileStore();

    // Service Hooks

        // Case File       
    const getCaseFileStatus = useCaseFileStatusService().data
    const caseFileStatus: CaseFileStatusType[] = getCaseFileStatus?.data || [];
    const caseId:  string | undefined = selectedCaseFile?.caseId

        // Users
    const getusers = useUsers().data
    const users: UserDetailType[] = getusers?.data || [];

        // Patch Case File
    const caseFileMutation = useUpdateCaseFileService(caseId)
   


    
    const onSubmit = async (data: any) => {
        console.log("Edit Case File", {
            "statusId": data.statusId,
            "remark": data.remark,
        });

     
        caseFileMutation.mutateAsync({
            "statusId": data.statusId,
            "remark": data.remark,
        });
      
       
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
                    <AlertDialogHeader className="w-full flex flex-col !justify-start !items-start">
                        <AlertDialogTitle className="text-left">Edit Case file</AlertDialogTitle>
                        <AlertDialogDescription className="text-left">Make changes to the case here. Click save when you're done.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="mt-5 w-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                            <div className="w-full flex sm:flex-row gap-6 flex-col">
                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="suspect number" className="form-label">Suspect Number</label>
                                    <input type="text" 
                                        placeholder="Suspect Number"
                                        disabled={true}
                                        // {...register('suspectNumber')}
                                        defaultValue={selectedCaseFile?.suspectNumber}
                                        className="form-input disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="status" className="form-label">
                                        Status ID
                                    </label>
                                    <Controller
                                        name="statusId"
                                        control={control}
                                        defaultValue={selectedCaseFile?.status?.statusId}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Status ID is required"
                                            }
                                        }}
                                        render={({ field: { onBlur, onChange } }) => (
                                      
                                        <Select
                                            defaultValue={selectedCaseFile?.status?.statusId}
                                            onValueChange={onChange}
                                          >
                                            <SelectTrigger 
                                                onBlur={onBlur}
                                                className={` outline-none border py-3 px-3 !w-full  text-sm font-medium text-custom_theme-primary_foreground dark:bg-custom_theme-dark_gray_1 dark:text-custom_theme-primary_background focus:ring-1 focus:ring-gray-400 dark:focus:ring-custom_theme-gray delay-150 transition ease-in-out duration-300
                                                    ${errors.statusId ? "form-validerr-ring " : "form-valid-ring"}
                                                `}>
                                                <SelectValue className="Select status"/>
                                            </SelectTrigger>
                                            
                                            <SelectContent className="">
                                                {caseFileStatus.map((status) => (
                                                    <SelectItem key={status.statusId} value={status.statusId} >
                                                        {status.name}
                                                    </SelectItem>
                                                 ))}
                                            </SelectContent>
                                            
                                        </Select>
                                      )}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="status" className="form-label">
                                   Investigator
                                </label>

                                <Controller
                                    name="investigator.userId"
                                    control={control}
                                    defaultValue={selectedCaseFile?.investigator?.userId}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Status ID is required"
                                        }
                                    }}
                                    render={({ field: { onBlur, value, onChange } }) => (
                                        <Select
                                            value={value?.userId}
                                            onValueChange={onChange}
                                            defaultValue={selectedCaseFile?.investigator?.userId}
                                        >
                                            <SelectTrigger 
                                                    onBlur={onBlur}
                                                    className={` outline-none border py-3 px-3 !w-full  text-sm font-medium text-custom_theme-primary_foreground dark:bg-custom_theme-dark_gray_1 dark:text-custom_theme-primary_background focus:ring-1 focus:ring-gray-400 dark:focus:ring-custom_theme-gray delay-150 transition ease-in-out duration-300
                                                    ${errors.status ? "form-validerr-ring " : "form-valid-ring"}
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
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="remark" className="text-sm font-medium">
                                    Remarks
                                </label>
                                <textarea 
                                    id="remark"
                                    cols={6} 
                                    rows={4} 
                                    {...register('remark', {
                                        required: {
                                            value: true,
                                            message: "Oops, you forgot to add your remarks"
                                        }
                                    })}
                                    className="w-full rounded-md border form-input"
                                    placeholder="Give your remarks"
                                    defaultValue={selectedCaseFile?.remark}
                                    {...register('remark', {
                                        required: {
                                            value: true,
                                            message: 'Oops you cannot submit the form without leaving a remark'
                                        }
                                    })}
                                />
                            </div>
                            <div className="w-full flex sm:flex-row gap-x-6 gap-y-3 py-3 flex-col-reverse">
                                <Button  
                                    type="submit" 
                                    className={`btn-default sm:min-w-[100px] w-full ${caseFileMutation.isPending ? "" : "max-w-max"}`}
                                >
                                    {caseFileMutation.isPending ? (
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
            
        </>
    )
    
};
