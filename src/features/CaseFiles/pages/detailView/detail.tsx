
import { Separator } from "@/components/ui/separator"
import { formatDateTime } from "@/lib/custom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"  
import { CustomBackButton } from "@/components/custom-ui/custom-buttons";
import { useRetrieveCaseFileService } from "@/service/case-files/service";
import { CaseFileType } from "@/common/Type/CaseFile/CaseFile.type";
import { useParams } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import PageLayout from "@/features/layout/PagesLayout";
import { useDetailCaseFileStore } from "@/hooks/state/case-files/case-file-store";


export default function CaseFileDetail() {

    const { caseId } = useParams({ from: "/dashboard/case-files/$caseId" });  // Get caseId from URL

    const { selectedCaseFile }  = useDetailCaseFileStore();

    const isCaseId = caseId 

    let _caseId 

    if (isCaseId === selectedCaseFile) {
        _caseId = selectedCaseFile
    }

    const { data: caseFileData, isLoading } = useRetrieveCaseFileService(_caseId ?? 'undefined'); 
    const response: CaseFileType = caseFileData?.data ?? {}; 

    // const createdAt = response?.createdAt
    // ? formatDateTime(response?.createdAt)
    // : "N/A";

     // Loading Skeleton

     if (isLoading ||  _caseId === 'undefined') {
        return (
            <div className="pt-10 pb-12">
                {/* <TopNavBar pageName="Update User" icon={UserRoundPen} /> */}
                <Skeleton className="h-5 w-32" />
                <PageLayout>
                    <div className="pt-7"/>
                    <Card className="rounded-[1.8rem] border">
                        <CardHeader>
                            <CustomBackButton />
                            <Skeleton className="h-5 w-32" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex gap-5">
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                                <div className="flex gap-5">
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                </PageLayout>
            </div>
        );
    };


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
                                            disabled={true}
                                            className="form-input" 
                                            defaultValue={response?.suspectNumber}
                                        />
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <label htmlFor="investigator-name" className="form-label">Investigator</label>
                                        <input 
                                            type="text" 
                                            disabled={true}
                                            className="form-input"
                                            key={response?.investigator?.userId}
                                            defaultValue={response?.investigator?.firstName + " " + response?.investigator?.lastName}
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex sm:flex-row gap-6 flex-col">
                                    <div className="w-full flex flex-col gap-2">
                                        <label htmlFor="status" className="form-label">Status</label>
                                        <input 
                                            type="text" 
                                            className="form-input"
                                            disabled={true}
                                            key={response?.status?.name}
                                            defaultValue={response?.status?.name}
                                        />
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <label htmlFor="date-created" className="form-label">Date Created</label>
                                        <input 
                                            type="text"
                                            disabled={true}
                                            className="form-input" 
                                            defaultValue={formatDateTime(`${response?.createdAt}`) || 'N/A'}
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="remark" className="form-label">Remark</label>
                                    <textarea
                                        rows={5}
                                        disabled={true}
                                        placeholder="Case file remark"
                                        className="form-input"
                                        defaultValue={response?.remark}
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
