import { Flag, Plus } from "lucide-react";
import PageLayout from "@/features/layout/PagesLayout";
import FraudNumberListTable from "../tables/FraudNumberTables";
import { FraudNumberExport } from "../tables/fraud-number-export";
import FraudNumberUpdatePage from "./update";
import { useNavigate } from "@tanstack/react-router";
import { CustomButton } from "@/components/custom-ui/buttons";
import TopNavBar from "@/components/custom-ui/topBarNav";



export default function FraudNumberListPage() {

    const navigate = useNavigate()

    return (
       <div className="">
            <TopNavBar pageName="Fraud Numbers" icon={Flag} />
            <PageLayout>
                <div className="">
                    <div className="flex justify-end item-end">
                        <div className="flex gap-3 justify-center items-center">
                            <FraudNumberExport />
                            <CustomButton onClick={() => navigate({ to: '/dashboard/case-files/create' })} size={'sm'} className="dark:text-primary-foreground dark:hover:bg-primary/85 text-sm font-medium !px-3 bg-primary text-primary-foreground hover:bg-primary/90">
                                <Plus className="mr-2 h-4 w-4" />
                                <span className="mr-1">Create Case File</span>
                            </CustomButton>
                            <FraudNumberUpdatePage />
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                           <FraudNumberListTable />
                        </div>
                    </div>
                </div>
            </PageLayout>
       </div>
    )
    
};
