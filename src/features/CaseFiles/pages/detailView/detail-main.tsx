import TopNavBar from "@/components/custom-ui/topBarNav"
import { Eye } from "lucide-react"
import PageLayout from "@/features/layout/PagesLayout"
import CaseFileDetail from "./detail"


export default function CaseFileDetailMain() {


    return (
       <div className="py-3">
            <TopNavBar pageName="Case File Detail" icon={Eye} />
            <div className="">
               
            </div>
            <PageLayout>
               <div className="my-2">
                    <CaseFileDetail />
               </div>
            </PageLayout>
       </div>
    )
    
};
