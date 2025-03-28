'use client'
import ReportNumberListPage from "@/features/ReportNumbers/pages/list";
import DashboardLayout from "../dashBoardLayout";
import RequireRole from "@/service/RBAC/RequireRole";



export default function ListPage() {

    return (

        <DashboardLayout>
            <RequireRole allowedRoles={['admin']} message="You need admin access to view this page">
                <ReportNumberListPage />
            </RequireRole>
        </DashboardLayout>
    )
    
};

