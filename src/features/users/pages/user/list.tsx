
import { Plus, Users } from "lucide-react";
import { CustomButton } from "@/components/custom-ui/buttons";
import TopNavBar from "@/components/custom-ui/topBarNav";
import PageLayout from "@/features/layout/PagesLayout";
import { useNavigate } from "@tanstack/react-router";
import UserListExport from "@/features/users//table/user/user-list-export";
import UserListTable from "@/features/users/table/user/user-table";
import DeleteUserDialog from "./delete";




export default function UserListComponent() {

    const navigate = useNavigate()

    return (
       <div className="py-3">
            <TopNavBar pageName="Users" icon={Users} />
            <PageLayout>
                <div className="space-y-8 mt-3">
                    <div className="w-full flex sm:justify-end items-center justify-end">
                        <div className="flex sm:flex-row gap-3 justify-center items-center flex-col">
                           <UserListExport />

                            <CustomButton 
                                onClick={() =>navigate({ to: '/users/create' })} 
                                size={'sm'}
                                variant={'create'}
                                className=""
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                <span className="mr-1">Create New User</span>
                                
                            </CustomButton>
                           {/* action */}
                           <DeleteUserDialog />
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                           <UserListTable />
                        </div>
                    </div>
                </div>
            </PageLayout>
       </div>
    )
    
};
