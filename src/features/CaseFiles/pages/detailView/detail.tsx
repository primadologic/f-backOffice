
import { Separator } from "@/components/ui/separator"
import { useDetailCaseFile } from "@/hooks/state/case-files/case-file-store"
import { formatDateTime } from "@/lib/custom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"  
import { CustomBackButton } from "@/components/custom-ui/custom-buttons";


export default function CaseFileDetail() {

    const { selectedCaseFile } = useDetailCaseFile();

    const investigatorFullname: string = selectedCaseFile?.investigator?.firstName + " " + selectedCaseFile?.investigator?.lastName 

    return (
        <div className="">
            <div className="">
                <Card className="rounded-[1.8rem] border">
                    <div className="w-full flex flex-row justify-start items-center">
                        <CardHeader className="flex flex-row justify-center items-center gap-x-5">
                            <CustomBackButton />
                            <CardTitle>Case File Detail</CardTitle>
                            {/* <CardDescription>Detail View for </CardDescription> */}
                        </CardHeader>
                    </div>
                    <Separator orientation="horizontal" className="my-2" />
                    <CardContent className="my-2">
                        <div className="">
                            <form action="" className="flex flex-col gap-6">
                                <div className="w-full flex sm:flex-row gap-6 flex-col">
                                    <div className="w-full flex flex-col gap-2">
                                        <label htmlFor="suspect-number" className="form-label">
                                            Suspect Number
                                        </label>
                                        <input 
                                            type="text" 
                                            className="form-input" 
                                            defaultValue={selectedCaseFile?.suspectNumber}
                                        />
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <label htmlFor="investigator-name" className="form-label">Investigator</label>
                                        <input 
                                            type="text" 
                                            className="form-input"
                                            key={selectedCaseFile?.investigator?.userId}
                                            defaultValue={investigatorFullname}
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex sm:flex-row gap-6 flex-col">
                                    <div className="w-full flex flex-col gap-2">
                                        <label htmlFor="status" className="form-label">Status</label>
                                        <input 
                                            type="text" 
                                            className="form-input"
                                            key={selectedCaseFile?.status?.statusId}
                                            defaultValue={selectedCaseFile?.status?.name}
                                        />
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <label htmlFor="date-created" className="form-label">Date Created</label>
                                        <input 
                                            type="text"
                                            className="form-input" 
                                            defaultValue={formatDateTime(selectedCaseFile?.createdAt)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="remark" className="form-label">Remark</label>
                                    <textarea
                                        rows={5}
                                        placeholder="Case file remark"
                                        className="form-input"
                                        defaultValue={selectedCaseFile?.remark}
                                    >
                                    </textarea>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>     
            </div>
        </div>
    )
    
};
