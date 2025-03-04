
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

import { useReportNumberStore } from "@/hooks/state/reports/sideSheet"




export default function ReportNumberViewSheet() {
    
    const { isOpen, selectedReportNumber, setIsOpen,  } = useReportNumberStore()

    return (
        <>

            <div className="">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button  className="sr-only">Open</Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-auto">
                        <SheetHeader className="flex !justify-start !items-start">
                            <SheetTitle>View Report incident</SheetTitle>
                            <SheetDescription>
                                Can only view but cannot edit.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="mt-5">
                            <form className="space-y-4">
                                <div className="space-y-2 flex flex-col gap-2">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="suspect-Number" className="text-start text-sm font-medium">Suspect Number</label>
                                        <input 
                                            type="text" placeholder="Suspect Number"
                                            disabled={true}
                                            className="outline-none border text-sm px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300"
                                            defaultValue={selectedReportNumber?.suspectNumber}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="platform" className="text-start text-sm font-medium">Platform</label>
                                        <input 
                                            type="text" placeholder="Platform"
                                            disabled={true}
                                            className="outline-none border text-sm px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300"
                                            defaultValue={selectedReportNumber?.reportPlatForm?.displayName}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 flex flex-col gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="suspect-Number" className="text-start text-sm font-medium">Archived</label>
                                        <input 
                                            type="text" placeholder="Status"
                                            disabled={true}
                                            className="outline-none capitalize text-sm border px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300"
                                            defaultValue={selectedReportNumber?.archived?.toString() ?? ""}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="Incident Date" className="text-start text-sm font-medium">Incident Date</label>
                                        <input 
                                            type="text" placeholder="Incident Date"
                                            disabled={true}
                                            className="outline-none capitalize text-sm border px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300"
                                            defaultValue={selectedReportNumber?.incidentDate}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="Date Created" className="text-start text-sm font-medium">Date Created</label>
                                        <input 
                                            type="text" placeholder="Incident Date"
                                            disabled={true}
                                            className="outline-none text-sm capitalize border px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300"
                                            defaultValue={selectedReportNumber?.createdAt}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="remark" className="text-start text-sm font-medium">
                                        Description
                                    </label>
                                    <textarea 
                                        id="remark"
                                        cols={6} 
                                        rows={5} 
                                        disabled={true}
                                        className="w-full text-sm rounded-md border p-2"
                                        placeholder="Reporter's description of the fraud incident"
                                        defaultValue={selectedReportNumber?.description}
                                    />
                                </div>
                                {/* <Button type="submit" className="mt-4">
                                    Save changes
                                </Button> */}
                            </form>
                           
                        </div>
                        <SheetFooter className="w-full mt-5 flex !justify-start !items-start">
                            <SheetClose asChild>
                                <Button type="button">Close</Button>
                            </SheetClose>
                        </SheetFooter>               
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
    
};
