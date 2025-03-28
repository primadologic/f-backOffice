
import { Button } from "@/components/ui/button"
import { useDeleteCaseFileStore } from "@/hooks/state/case-files/case-file-store"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeletCaseFileService, useRetrieveCaseFileService } from "@/service/case-files/service"
import Loader from "@/components/custom-ui/loader"
import { CustomCloseButton } from "@/components/custom-ui/custom-buttons"
import { maskNumber } from "@/lib/custom"



export default function DeleteCaseFileDialog() {

    const { isOpen, selectedCaseFile, setIsOpen } = useDeleteCaseFileStore();

    // Service Hooks

        // Delete Case File
    const caseId: string = selectedCaseFile ?? 'undefined'
    const deleteCaseFileMutation = useDeletCaseFileService(caseId)
    

    // Selectors
    const { data: caseFileData, isLoading } = useRetrieveCaseFileService(caseId)


    const deleteHandler = () => {
        deleteCaseFileMutation.mutateAsync(caseId)
    };
    
    const firstName = caseFileData?.data?.investigator.firstName ?? '';
    const lastName  = caseFileData?.data?.investigator?.lastName ?? '';

    const fullName = firstName + " " + lastName
    
    
    if (isLoading || caseId === 'undefined') {
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
                    Delete Case File
                </AlertDialogTrigger>
                <AlertDialogContent className="">
                    <AlertDialogHeader className="w-full flex flex-col space-y-1 !justify-start !items-start">
                        <AlertDialogTitle className="text-left">Are you sure you want to delete this case file?</AlertDialogTitle>
                        <AlertDialogDescription className="text-left space-y-2">
                            <span>This action cannot be undone.</span> {" "}
                            <span>This will <span>permanently</span> delete this record and remove the data from the database</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                        <div className="">
                            <div className="max-w-max">
                                <div className="flex flex-col gap-y-1">
                                    <div className="flex flex-row gap-3">
                                        <p className="form-label">Suspect Number:</p>
                                        <data 
                                            value={ caseFileData?.data?.suspectNumber || "Suspect Number"}
                                            className="custom-txt"
                                        >
                                            {maskNumber(`${caseFileData?.data?.suspectNumber}`) ?? 'N?A'}
                                        </data>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <p className="form-label">Investigator:</p>
                                        <data 
                                            value={ `${fullName}` || "investigator"}
                                            className="custom-txt capitalize"
                                        >
                                            {maskNumber(fullName) || "N/A"}
                                        </data>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <p className="form-label">Status:</p>
                                        <data 
                                            value={caseFileData?.data?.status?.name || "status"}
                                            className="custom-txt capitalize"
                                        >
                                            {caseFileData?.data?.status?.name || "N/A"} 
                                        </data>
                                    </div>
                                    {/* <div className="flex flex-row gap-3">
                                        <p className="form-label">Remark:</p>
                                        <data 
                                            value={caseFileData?.data?.remark || "remark"}
                                            className="custom-txt "
                                        >
                                            {caseFileData?.data?.remark || "N/A"} 
                                        </data>
                                    </div> */}
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
                                    deleteCaseFileMutation.isPending ? "sm:min-w-[6.25rem]" : "sm:max-w-max w-full"
                                }`}
                            >
                                {deleteCaseFileMutation.isPending ? (
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
