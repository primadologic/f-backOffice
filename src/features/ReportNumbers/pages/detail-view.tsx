
import { useReportNumberStore } from "@/hooks/state/reports/report-store"
import { formatDateTime, maskNumber } from "@/lib/custom";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { CustomCloseButton } from "@/components/custom-ui/custom-buttons";

  


export default function ReportNumberViewSheet() {
    
    const { isOpen, selectedReportNumber, setIsOpen  } = useReportNumberStore();

   // Filter reportFiles to only include strings
  const allReportFiles: string[] =
  (selectedReportNumber?.reportFiles?.filter(
    (file): file is string => typeof file === "string" && file.startsWith("http")
  ) || []);


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
                                <div className="w-full flex sm:flex-row gap-6 flex-col sm:items-center">
                                    <div className="flex flex-col gap-2 w-full">
                                        <label htmlFor="suspect-Number" className="text-start text-sm font-medium">Suspect Number</label>
                                        <input 
                                            type="text" placeholder="Suspect Number"
                                            disabled={true}
                                            className="outline-none border text-sm px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300"
                                            defaultValue={maskNumber(selectedReportNumber?.suspectNumber)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
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
                                    <div className="w-full flex sm:flex-row gap-6 flex-col sm:items-center">
                                        <div className="flex flex-col gap-2 w-full ">
                                            <label htmlFor="suspect-Number" className="text-start text-sm font-medium">Archived</label>
                                            <input 
                                                type="text" placeholder="Status"
                                                disabled={true}
                                                className="outline-none capitalize text-sm border px-3 py-2 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300"
                                                defaultValue={selectedReportNumber?.archived?.toString() ?? ""}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
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
                 
                                            {/* <div className="flex items-center justify-between space-x-4 px-4 py-3">
                                                <h4 className="text-sm font-semibold sm:block hidden">
                                                    Click to view files
                                                </h4>
                                                <h4 className="text-sm font-semibold sm:hidden block">
                                                    Tap to view files
                                                </h4>
                                                
                                            </div> */}

                                            
                                            {allReportFiles.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {allReportFiles.map((data, index) => (
                                                <div
                                                    key={index}
                                                    className="rounded-md w-[8rem]  border px-4 py-2 font-mono text-sm shadow-sm"
                                                >
                                                    <a href={data} target="_blank" className="block w-full truncate">
                                                        Evidence {index + 1}
                                                    </a>
                                                </div>
                                                ))}
                                            </div>
                                            ) : (
                                            <div className="px-4 py-3 text-sm text-gray-500">
                                                No files available.
                                            </div>
                                            )}

                                    
                                    </div>
                                </div>
                            </form>
                        </div>
                        <CustomCloseButton />
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
