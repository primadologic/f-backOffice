
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { useFraudNumberStore } from "@/hooks/state/fraud-numbers/fraudSheet.state"



export default function FraudNumberUpdatePage() {
    
    const { isOpen, selectedFraudNumber, setIsOpen } = useFraudNumberStore()

    return (
        <>

            <div className="">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button  className="sr-only">Open</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader className="flex !justify-start !items-start">
                            <SheetTitle>Edit Fraud Number</SheetTitle>
                            <SheetDescription>
                                Make changes to the case here. Click save when you&apos;re done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="mt-5">
                            <form className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="status" className="text-start text-sm font-medium">
                                        Fraud Number
                                    </label>
                                    <input type="text" placeholder="Fraud Number" 
                                        disabled={true}
                                        defaultValue={selectedFraudNumber?.fraudNumber}
                                        className="outline-none border text-sm px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                   <label htmlFor="approve case" className="text-start text-sm font-medium">Approve Case</label>
                                   <div className="space-x-5 flex flex-row justify-between items-center outline-none border text-sm px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-30">
                                        <label htmlFor="approce case">Approve Investigation</label>
                                        <Switch id="approve-case" defaultChecked={selectedFraudNumber?.visibility}/>
                                   </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                   <label htmlFor="visibility"className="text-start text-sm font-medium" ></label>
                                   <div className="space-x-5 flex flex-row justify-between items-center outline-none border text-sm px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-30">
                                        <label htmlFor="visibility">Turn on Visibilty</label>
                                        <Switch id="visibility" defaultChecked={selectedFraudNumber?.visibility} />
                                   </div>
                                </div>
                                <Button type="submit" className="mt-4">
                                    Save changes
                                </Button>
                            </form>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
    
};
