
import { Button } from "@/components/ui/button"
import { useDeleteCaseFileStore } from "@/hooks/state/case-files/case-file-stiore"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useDeletCaseFileService } from "@/service/case-files/service"
import Loader from "@/components/custom-ui/loader"
import { CustomCloseButton } from "@/components/custom-ui/custom-buttons"





export default function DeleteCaseFileDialog() {

    const { isOpen: isDeleteOpen, selectedCaseFile: deleteSeletedCaseFile, setIsOpen: setIsDeleteOpen } = useDeleteCaseFileStore();

    // Service Hooks

        // Delete Case File
    const caseId:  string | undefined = deleteSeletedCaseFile?.caseId
    const deletCaseFileMutation = useDeletCaseFileService(caseId)


    // Selectors
    const investigator: string | null = deleteSeletedCaseFile?.investigator?.firstName + " " + deleteSeletedCaseFile?.investigator?.lastName
    if (!investigator) return "";
    const suspectNumber: string | null = deleteSeletedCaseFile?.suspectNumber ?? null
    if (!suspectNumber) return "";
    const remark: string | null = deleteSeletedCaseFile?.remark ?? null
    if (!remark) return "";
    const status: string | null = deleteSeletedCaseFile?.status?.name ?? null
    if (!status) return "";
    
    


    
    const deleteHandler = async () => {
        setTimeout(() => {
            console.log("Some delay");
        }, 5000)

        console.log("Delelte Case File");
       
    }

    return (
        <>
            <AlertDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
            >
                <AlertDialogTrigger className="sr-only">
                    Edit
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
                                        <p className="form-label">Investigator:</p>
                                        <data 
                                            value={suspectNumber || "Suspect Number"}
                                            className="custom-txt"
                                        >
                                            {suspectNumber || "N/A"} 
                                        </data>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <p className="form-label">Suspect Number:</p>
                                        <data 
                                            value={investigator || "investigater"}
                                            className="custom-txt capitalize"
                                        >
                                            {investigator || "N/A"} 
                                        </data>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <p className="form-label">Status:</p>
                                        <data 
                                            value={status || "status"}
                                            className="custom-txt capitalize"
                                        >
                                            {status || "N/A"} 
                                        </data>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                        <div className="w-full flex sm:flex-row gap-x-6 gap-y-3 py-3 flex-col">
                            <CustomCloseButton />

                            <Button
                                type="submit"
                                variant={"destructive"}
                                onClick={deleteHandler}
                                className={`btn-default min-w-[100px] ${
                                    deletCaseFileMutation.isPending ? "" : "max-w-max"
                                }`}
                            >
                                {deletCaseFileMutation.isPending ? (
                                    <span className="flex items-center justify-center w-[100px]"> {/* Ensure the span has the desired width */}
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
