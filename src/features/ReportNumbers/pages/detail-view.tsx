


import { useReportNumberStore } from "@/hooks/state/reports/report-store"
import { formatDateTime, maskNumber } from "@/lib/custom";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
  


export default function ReportNumberViewSheet() {
    
    const { isOpen, selectedReportNumber, setIsOpen,  } = useReportNumberStore();
    const [ open, setOpen ] = useState<boolean>(false)


    return (
        <>

            <div className="">
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger className="sr-only">Open</AlertDialogTrigger>
                    <AlertDialogContent className="overflow-auto">
                        <AlertDialogHeader>
                            <AlertDialogTitle>View Report incident</AlertDialogTitle>
                            <AlertDialogDescription>
                                Can only view but cannot edit.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="mt-2">
                            <form className="space-y-4">
                                <div className="w-full flex sm:flex-row gap-2 flex-col justify-between sm:items-center">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="suspect-Number" className="text-start text-sm font-medium">Suspect Number</label>
                                        <input 
                                            type="text" placeholder="Suspect Number"
                                            disabled={true}
                                            className="outline-none border text-sm px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300"
                                            defaultValue={maskNumber(selectedReportNumber?.suspectNumber)}
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
                                <div className="space-y-2 flex flex-col gap-2">
                                    <div className="w-full flex sm:flex-row gap-2 flex-col justify-between sm:items-center">
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
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="Date Created" className="text-start text-sm font-medium">Date Created</label>
                                        <input 
                                            type="text" placeholder="Incident Date"
                                            disabled={true}
                                            className="outline-none text-sm capitalize border px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300"
                                            defaultValue={formatDateTime(selectedReportNumber?.createdAt)}
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
                                <div className="space-y-2 max-w-max">
                                    <label htmlFor="report files" className="text-start text-sm font-medium">
                                       Report Files
                                    </label>
                                    <div className="">
                                        <Collapsible
                                            open={open}
                                            onOpenChange={setOpen}
                                            className="w-full"
                                        >
                                            <div className="flex items-center justify-between space-x-4 px-4">
                                                <h4 className="text-sm font-semibold sm:block hidden">
                                                    Click to view files
                                                </h4>
                                                <h4 className="text-sm font-semibold sm:hidden block">
                                                    Tap to view files
                                                </h4>
                                                <CollapsibleTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <ChevronsUpDown className="h-4 w-4" />
                                                        <span className="sr-only">Toggle</span>
                                                    </Button>
                                                </CollapsibleTrigger>
                                            </div>
                                            {selectedReportNumber?.reportFiles?.map((file: string, index: number) => (
                                                <CollapsibleContent key={index + 1} className="space-y-2 max-w-max">
                                                    <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                                                        <a href={file} target="_blank">
                                                            <span className="font-bold">Evidence {index + 1}</span>
                                                        </a>
                                                    </div>
                                                </CollapsibleContent>
                                            ))}
                                            
                                        </Collapsible>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

















                
                {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                             
                            </form>
                           
                        </div>
                        <SheetFooter className="w-full mt-5 flex !justify-start !items-start">
                            <SheetClose asChild>
                                <Button type="button">Close</Button>
                            </SheetClose>
                        </SheetFooter>               
                    </SheetContent>
                </Sheet> */}

              
            </div>
        </>
    )
    
};
