
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { useFraudNumberStore } from "@/hooks/state/fraud-numbers/fraudSheet.state"
import { useForm } from "react-hook-form"
import { CustomCloseButton } from "@/components/custom-ui/custom-buttons"



export default function FraudNumberUpdatePage() {
    
    const { isOpen, selectedFraudNumber, setIsOpen } = useFraudNumberStore()


    // const fraudNumber = selectedFraudNumber?.fraudNumberId

    // const fraudNumberData = useFraudNumberListService();
    // const response: FraudNumberNewType[] = fraudNumberData.data?.data ?? [];

    // const currentFraudNumber = response.find((cf) => cf.fraudNumberId === fraudNumber)

    // const safeFraudNumber = currentFraudNumber?.fraudNumberId ?? ""; // Always a string

    // const retrievefraudNumberData = useRetrieveFraudNumber(safeFraudNumber);
    
    // const fraudNumberResponse: FraudNumberGetType = retrievefraudNumberData?.data?.data ?? {};


    // Initialize React Hook Form
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            // fraudNumber: fraudNumberResponse?.fraudNumber || "",
            approveCase: selectedFraudNumber?.approved || false,
            visibility: selectedFraudNumber?.visibility || false,
        },

        criteriaMode: "all"

    });


    const onSubmit = (data: any) => {
        console.log("Edit Fraud Number", data);
    }


    return (
        <>

            <div className="">
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                        <Button  className="sr-only">Open</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader className="flex !justify-start !items-start">
                            <AlertDialogTitle>Edit Fraud Number</AlertDialogTitle>
                            <AlertDialogDescription>
                                Make changes to the case here. Click save when you&apos;re done.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="mt-5">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="status" className="form-label">
                                        Fraud Number
                                    </label>
                                    <input type="text" placeholder="Fraud Number" 
                                        // {...register("fraudNumber")}
                                        defaultValue={selectedFraudNumber?.fraudNumber}
                                        className="form-input disabled:cursor-not-allowed"
                                    />
                                    {/* {errors.fraudNumber && <p className="form-error-msg">{errors.fraudNumber.message}</p>} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                <label htmlFor="approve case" className="form-label">Approve Case</label>
                                <div className="space-x-5 flex flex-row justify-between items-center outline-none border text-sm px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-30">
                                        <label htmlFor="approveCase" className="form-label">Approve Investigation</label>
                                        <Switch 
                                            id="approveCase" 
                                            {...register('visibility')}
                                            onCheckedChange={(checked) => setValue("approveCase", checked)}
                                            className="text-base font-medium text-custom_theme-primary_foreground dark:bg-custom_theme-dark_gray_1 dark:text-custom_theme-primary_background"
                                            // defaultChecked={fraudNumberResponse?.visibility}
                                        />
                                        {errors.approveCase && <p className="form-error-msg">{errors.approveCase.message}</p>}
                                </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="space-x-5 flex flex-row justify-between items-center outline-none border text-sm px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-30">
                                        <label htmlFor="visibility" className="form-label">Turn on Visibilty</label>
                                        <Switch 
                                            id="visibility" 
                                            // defaultChecked={fraudNumberResponse?.visibility} 
                                            onCheckedChange={(checked) => setValue("visibility", checked)}
                                            className="text-base font-medium text-custom_theme-primary_foreground dark:bg-custom_theme-dark_gray_1 dark:text-custom_theme-primary_background"
                                        />
                                        {errors.visibility && <p className="form-error-msg">{errors.visibility.message}</p>}
                                    </div>
                                </div>
                                <div className="w-full flex items-center sm:flex-row gap-x-6 gap-y-3 py-3 flex-col-reverse">
                                    <CustomCloseButton />

                                    <Button  
                                         type="submit" 
                                        //  className={`btn-default sm:min-w-[6.25rem]  ${ updateCaseFileMutation.isPending ? "sm:min-w-[6.25rem]" : "sm:max-w-max w-full"}`}
                                        className="btn-default sm:min-w-[6.25rem]"
                                     >
                                         {/* {updateCaseFileMutation.isPending ? (
                                             <span className="flex items-center justify-center sm:w-[6.25rem]"> 
                                                 <Loader /> 
                                             </span>
                                         ) : (
                                             <span>Save Changes</span>
                                         )} */}

                                        Save Changes

                                    </Button>
                                </div>
                            </form>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            
        </>
    )
    
};
