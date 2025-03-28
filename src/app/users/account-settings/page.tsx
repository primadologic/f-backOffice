

import DashboardLayout from "@/app/dashboard/dashBoardLayout";
import AccountSettingsComponent from "@/features/account-settings";


export default function Page() {

    return (

       <>
            <DashboardLayout>
                <AccountSettingsComponent />
            </DashboardLayout>
       </>
    )
    
};
