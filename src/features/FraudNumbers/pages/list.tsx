import { Flag } from "lucide-react";
import PageLayout from "@/features/layout/PagesLayout";
import FraudNumberListTable from "../tables/FraudNumberTables";
import { FraudNumberExport } from "../tables/fraud-number-export";
import FraudNumberUpdatePage from "./update";
import TopNavBar from "@/components/custom-ui/topBarNav";
import DeleteFraudNumberDialog from "./delete";
import { useRouterState } from "@tanstack/react-router";
import LoadingSkeleton from "@/components/custom-ui/page-loading-ui";
import { useFraudNumberListService } from "@/service/fraud-numbers/service";



export default function FraudNumberListPage() {

    // const navigate = useNavigate()

    const { status } = useRouterState() // Get the current State of router state

    const { isLoading, isPending, }  = useFraudNumberListService();
    
    if ( status ===  "pending" ) {
        return <LoadingSkeleton />
    } 
    else if (isLoading || isPending) {
        return <LoadingSkeleton />
    }



    return (
       <div className="pt-5">
            <TopNavBar pageName="Fraud Numbers" icon={Flag} />
            <PageLayout>
                <div className="pt-5 pb-12">
                    <div className="flex justify-end item-end">
                        <div className="flex gap-3 justify-center items-center">
                            <FraudNumberExport />
                            {/* <CustomButton onClick={() => navigate({ to: '/dashboard/case-files/create' })} 
                                size={'sm'} 
                                variant={'create'}
                                className=""
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                <span className="mr-1">Create Case File</span>
                            </CustomButton> */}
                            <FraudNumberUpdatePage />
                            <DeleteFraudNumberDialog />
                        </div>
                    </div>
                    <div className="py-8">
                        <div className="">
                           <FraudNumberListTable />
                        </div>
                    </div>
                </div>
            </PageLayout>
       </div>
    )
    
};
