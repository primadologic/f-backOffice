import { UserRoundPen } from "lucide-react";
import TopNavBar from "@/components/custom-ui/topBarNav";
import PageLayout from "@/features/layout/PagesLayout";
import { useRouterState } from "@tanstack/react-router";
import UserAvatarComponent from "./profile-avatar";
import UserInfoComponent from "./personal-info";
import ChangePasswordComponent from "./change-password";
import { useCurrentUser, UserResponse } from "@/service/accounts/fetchCurrentUser";
import UpdateAvatarDialog from "./dialogs/profile-dialog";
import AccountInfoDialog from "./dialogs/info-dialog";
import { Skeleton } from "@/components/ui/skeleton";





export default function AccountSettingsComponent() {

    const { status } = useRouterState() // Get the current State of router state\

    const { data: userResponse, isLoading } = useCurrentUser() as {
        data: UserResponse;
        isLoading: boolean;
        isError: boolean;
        error: Error
    }




    // if (isError) {
    //     return <div>Error: {error?.message || "Something went wrong!"}</div>;
    // }

    
    // if (isError) {
    //     return <div>Error: {error?.message || "Something went wrong!"}</div>;
    // }
    


    // Show skeleton if the routeis still loading


    if (status === "pending" || isLoading) {
        return (
          <div className="pt-5">
            <PageLayout>
              <div className="space-y-10 py-5 pb-12">
                <div className="flex flex-col gap-y-6">
                    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex sm:flex-row flex-col space-y-3 justify-between sm:items-center items-start">
                            <div className="flex flex-row gap-x-5 justify-start items-center">
                                <Skeleton className="w-20 h-20 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="w-44 h-4" />
                                    <Skeleton className="w-24 h-4" />
                                </div>
                            </div>
                            <div className="">
                                <Skeleton className="w-16 h-8"/>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-lg space-y-5 border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-row justify-between items-start ">
                            <Skeleton className="w-44 h-6" />
                            <Skeleton className="w-16 h-8"/>
                        </div>
                        <div className="sm:w-[40vw] w-full">
                            <dl className="space-y-2 flex flex-col justify-between gap-4">
                                <div className="flex sm:flex-row flex-col space-y-4  text-left justify-between sm:items-center">
                                    <div className="space-y-2">
                                        <Skeleton className="w-16 h-4" />
                                        <Skeleton className="w-28 h-5" />
                                    </div>
                                    <div className="space-y-2 flex flex-col items-end">
                                        <Skeleton className="w-16 h-4" />
                                        <Skeleton className="w-28 h-5" />
                                    </div>
                                </div>
                                <div className="flex sm:flex-row flex-col space-y-4  text-left justify-between sm:items-center">
                                    <div className="space-y-2">
                                        <Skeleton className="w-20 h-4" />
                                        <Skeleton className="w-48 h-5" />
                                    </div>
                                    <div className="space-y-2 flex flex-col items-end">
                                        <Skeleton className="w-16 h-4" />
                                        <Skeleton className="w-28 h-5" />
                                    </div>
                                </div>
                                <div className="flex sm:flex-row flex-col space-y-4  text-left justify-between sm:items-center">
                                    <div className="space-y-2 text-left">
                                        <Skeleton className="w-16 h-4" />
                                        <Skeleton className="w-28 h-6" />
                                    </div>
                                    <div className="space-y-2 flex flex-col items-end">
                                        <Skeleton className="w-16 h-4" />
                                        <Skeleton className="w-28 h-5" />
                                    </div>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div className="p-8 sm:w-[500px] space-y-6 w-full rounded-lg border bg-card text-card-foreground shadow-sm">
                        <Skeleton className="w-32 h-6" />
                        <div className=" flex flex-col gap-4 w-full rounded-md">
                            <div className="flex flex-col space-y-2">
                                <Skeleton className="w-24 h-6" />
                                <Skeleton className="w-full h-12" />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Skeleton className="w-24 h-6" />
                                <Skeleton className="w-full h-12" />
                            </div>
                            <div className="flex sm:flex-row flex-col gap-4">
                                <Skeleton className="w-28 h-11"/>
                                <Skeleton className="w-28 h-11"/>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </PageLayout>
          </div>
        );
      }

    if (!userResponse?.data) {
        return <div>No user data available.</div>; // Or handle it as you like
    }
    

    return (
       <div className="pt-5">
            <TopNavBar pageName="My Profile" icon={UserRoundPen } />
            <UpdateAvatarDialog />
            <PageLayout>
                <div className="space-y-10 py-5 pb-12">
                    
                    <div className="flex flex-col gap-y-6">
                        <div className="">
                            <UserAvatarComponent user={userResponse} />
                        </div>
                        <div className="">
                            <UserInfoComponent user={userResponse} />
                        </div>
                        <div className="">
                            <ChangePasswordComponent />
                            <AccountInfoDialog />
                        </div>
                    </div>
                </div>
            </PageLayout>
       </div>
    )
    
};
