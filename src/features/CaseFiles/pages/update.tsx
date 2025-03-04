
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { useCaseFileStore } from "@/hooks/state/case-files/ui-component"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { CaseStatusData } from "@/data/CaseFiles/CaseStatus.table.data"



export default function UpdateCaseFile() {
    
    const { isOpen, selectedCaseFile, setIsOpen, updateStatus } = useCaseFileStore()

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button  className="sr-only">Open</Button>
                </SheetTrigger>
                <SheetContent className="">
                    <SheetHeader className="w-full flex flex-col !justify-start !items-start">
                        <SheetTitle>Edit Case file</SheetTitle>
                        <SheetDescription>
                            Make changes to his case file
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mt-5 w-full">
                        <form className="space-y-4 w-full">
                            <div className="space-y-2 w-full flex flex-col gap-2">
                                <label htmlFor="status" className="text-start text-sm font-medium">
                                    Status ID
                                </label>
                                <Select
                                    value={selectedCaseFile?.status?.statusId}
                                    onValueChange={updateStatus}
                                    
                                    
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status">
                                            {selectedCaseFile?.status?.name}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CaseStatusData.map((status) => (
                                            <SelectItem 
                                                key={status.statusId} 
                                                value={status.statusId}
                                                
                                            >
                                                {status.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 w-full flex flex-col gap-2">
                                <label htmlFor="remark" className="text-sm font-medium">
                                    Remarks
                                </label>
                                <textarea 
                                    id="remark"
                                    cols={6} 
                                    rows={4} 
                                    className="w-full rounded-md border p-2"
                                    placeholder="Give your remarks"
                                    defaultValue={selectedCaseFile?.remark}
                                />
                            </div>
                            <Button type="submit" className="mt-4">
                                Save changes
                            </Button>
                        </form>
                    </div>
                </SheetContent>
            </Sheet>
            
        </>
    )
    
};
