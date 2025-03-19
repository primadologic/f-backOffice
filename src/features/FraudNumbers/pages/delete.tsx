
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
import { maskNumber } from "@/lib/custom"
import { useDeleteFraudNumberService } from "@/service/fraud-numbers/service"
import { useDeleteFraudNumberStore } from "@/hooks/state/fraud-numbers/fraudSheet.state"



export default function DeleteFraudNumberDialog() {

    const { isOpen, setIsOpen, selectedFraudNumber } = useDeleteFraudNumberStore();

    // Service Hooks

        // Delete Case File
    const currentFraudNumberId: string | undefined = selectedFraudNumber?.fraudNumberId ?? undefined
    const deleteFraudNumberMutation = useDeleteFraudNumberService()
    
   


    const deleteHandler = () => {
        if (currentFraudNumberId) {
            deleteFraudNumberMutation.mutateAsync(currentFraudNumberId)
        }
    };
    
    

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
                        <AlertDialogTitle className="text-left">Are you sure you want to delete this fraud number?</AlertDialogTitle>
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
                                            value={maskNumber(selectedFraudNumber?.fraudNumber) || "Fraud Number"}
                                            className="custom-txt"
                                        >
                                            {selectedFraudNumber?.fraudNumber || "N/A"} 
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
                                    deleteFraudNumberMutation.isPending ? "sm:min-w-[6.25rem]" : "sm:max-w-max w-full"
                                }`}
                            >
                                {deleteFraudNumberMutation.isPending ? (
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
