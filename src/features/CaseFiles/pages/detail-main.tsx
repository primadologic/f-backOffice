import TopNavBar from "@/components/custom-ui/topBarNav"
import { Eye } from "lucide-react"
import CaseFileDetail from "./detail"
import PageLayout from "@/features/layout/PagesLayout"


export default function CaseFileDetailMain() {


    return (
       <div className="py-3">
            <TopNavBar pageName="Case File Detail" icon={Eye} />

            <PageLayout>
               <div className="my-3">
                    <CaseFileDetail />
               </div>
            </PageLayout>
       </div>
    )
    
};
