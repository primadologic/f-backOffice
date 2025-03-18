
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
import { useFraudNumberListService, useRetrieveFraudNumber } from "@/service/fraud-numbers/service"
import { FraudNumberGetType, FraudNumberNewType } from "@/common/Type/FraudNumber/fraud-numbers"
import { useForm } from "react-hook-form"



export default function FraudNumberUpdatePage() {
    
    const { isOpen, selectedFraudNumber, setIsOpen } = useFraudNumberStore()


    const fraudNumber = selectedFraudNumber?.fraudNumberId

    const fraudNumberData = useFraudNumberListService();
    const response: FraudNumberNewType[] = fraudNumberData.data?.data ?? [];

    const currentFraudNumber = response.find((cf) => cf.fraudNumberId === fraudNumber)

    const safeFraudNumber = currentFraudNumber?.fraudNumberId ?? ""; // Always a string

    const retrievefraudNumberData = useRetrieveFraudNumber(safeFraudNumber);
    
    const fraudNumberResponse: FraudNumberGetType = retrievefraudNumberData?.data?.data ?? [];

      // Initialize React Hook Form
      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fraudNumber: fraudNumberResponse?.fraudNumber || "",
            approveCase: fraudNumberResponse?.visibility || false,
            visibility: fraudNumberResponse?.visibility || false,
        },

        criteriaMode: "all"

    });


    return (
        <>

            <div className="">
                <AlertDialog>
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
                            <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="status" className="text-start text-sm font-medium">
                                        Fraud Number
                                    </label>
                                    <input type="text" placeholder="Fraud Number" 
                                        disabled={true}
                                        {...register("fraudNumber")}
                                        // defaultValue={fraudNumberResponse?.fraudNumber}
                                        className="outline-none border text-sm px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                <label htmlFor="approve case" className="text-start text-sm font-medium">Approve Case</label>
                                <div className="space-x-5 flex flex-row justify-between items-center outline-none border text-sm px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-30">
                                        <label htmlFor="approveCase">Approve Investigation</label>
                                        <Switch 
                                            id="approveCase" 
                                            {...register('visibility')}
                                            onCheckedChange={(checked) => setValue("approveCase", checked)}
                                            // defaultChecked={fraudNumberResponse?.visibility}
                                        />
                                </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="visibility"className="text-start text-sm font-medium" ></label>
                                    <div className="space-x-5 flex flex-row justify-between items-center outline-none border text-sm px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-30">
                                        <label htmlFor="visibility">Turn on Visibilty</label>
                                        <Switch 
                                            id="visibility" 
                                            defaultChecked={fraudNumberResponse?.visibility} 
                                            onCheckedChange={(checked) => setValue("visibility", checked)}
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="mt-4">
                                    Save changes
                                </Button>
                            </form>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            
        </>
    )
    
};
