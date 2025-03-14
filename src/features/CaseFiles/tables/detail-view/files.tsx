
import { ApiResponse } from "@/common/api-response.type";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useDetailCaseFile } from "@/hooks/state/case-files/case-file-store";
import { useRetrieveCaseFileService } from "@/service/case-files/service";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";


export default function DetailViewFilesTab() {

    const { selectedCaseFile } = useDetailCaseFile();

     const [ open, setOpen ] = useState<boolean>(false)
  
    const caseId: string | null = selectedCaseFile?.caseId ?? ""

    const retrieveCaseFile: ApiResponse = useRetrieveCaseFileService(caseId).data;
 
     const reportFiles = retrieveCaseFile?.data?.reports || []

    return (
        <div className="my-10">
            <div className="space-y-2 max-w-max">
                <label htmlFor="report files" className="text-start text-sm font-medium">
                   Report Files
                </label>
                <div className="">
                    <Collapsible
                        open={open}
                        onOpenChange={setOpen}
                        className="w-full "
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
                        {reportFiles?.map((file: string, index: number) => (
                            <CollapsibleContent key={index + 1} className="max-w-max ">
                                <div className="rounded-md  border  px-4 py-2 font-mono text-sm shadow-sm">
                                    <a href={file} target="_blank" className=" ">
                                        <span className="font-bold flex ">Evidence {index + 1}</span>
                                    </a>
                                </div>
                            </CollapsibleContent>
                        ))}
                        
                    </Collapsible>
                </div>
            </div>
        </div>
    )
    
};
