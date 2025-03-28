
import { CaseFileType, CommentType } from "@/common/Type/CaseFile/CaseFile.type";
import { useRetrieveCaseFileService } from "@/service/case-files/service";
import { useParams } from "@tanstack/react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export default function DetailViewCommentTab() {

  
    const { caseId } = useParams({ from: "/dashboard/case-files/$caseId" });  // Get caseId from URL
   
    const caseFileData = useRetrieveCaseFileService(caseId); 
    const response: CaseFileType = caseFileData.data?.data;

    const caseFileComments: CommentType[] = response?.comments|| []
    
    const allComments = caseFileComments


    return (
        <div className="my-10">
            <div className="space-y-2 max-w-max">
                <div className="">
                {allComments.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allComments.map((data, index) => (
                        <div
                        key={index}
                        className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
                        >
                        <Card>
                            <CardHeader>
                            <CardTitle>
                                {data.user.firstName && data.user.lastName
                                ? `${data.user.firstName} ${data.user.lastName}`
                                : data.user.email}
                            </CardTitle>
                            <CardDescription>
                                {new Date(data.dateCreated).toLocaleDateString(
                                "en-US",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                }
                                )}
                            </CardDescription>
                            </CardHeader>
                            <CardContent>
                            <p>{data.notes}</p>
                            </CardContent>
                            <CardFooter>
                            {data.user.avatarUrl && (
                                <div className="">
                                      <Avatar className="w-8 h-8 rounded-full">
                                        <AvatarImage 
                                            src={data.user.avatarUrl|| 'https://github.com/shadcn.png'}
                                            className="w-full h-full object-cover"
                                        />
                                        <AvatarFallback className="uppercase text-lg"></AvatarFallback>
                                    </Avatar>
                                </div>
                              
                            )}
                            </CardFooter>
                        </Card>
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
        </div>
    )
    
};
