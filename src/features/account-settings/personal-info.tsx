import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    // CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAccountInfoStore } from "@/hooks/state/account/account.state";
import { maskNumber } from "@/lib/custom";
import { UserResponse } from "@/service/accounts/fetchCurrentUser";
import { PencilLine } from "lucide-react";


export default function UserInfoComponent({ user }: {user: UserResponse} ) {

    const { setIsOpen, setSelectedUser } = useAccountInfoStore((state) => state);

    const handleOPen = () => {
        if (user?.data?.userId) {
            console.log();
            setSelectedUser(`${user?.data?.userId}`)
            setIsOpen(true)
        }
    }

    return (
        <div className="">
            <Card  className="border py-3 px-5">
                <CardHeader className="flex flex-row justify-between items-start">
                    <CardTitle>Personal Information</CardTitle>
                    <Button
                        variant={"ghost"}
                        size={'sm'}
                        onClick={handleOPen}
                        className="space-x-1 border px-4 !rounded-2xl"
                    >
                        <span>Edit</span>
                        <span><PencilLine  /></span>
                    </Button>
                </CardHeader>
                <CardContent className="sm:w-[40vw] w-full">
                    <dl className="space-y-2 flex flex-col justify-between gap-4">
                        <div className="flex sm:flex-row flex-col space-y-4  text-left justify-between sm:items-center">
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    First Name
                                </dt>
                                <dd className="text-secondary-foreground font-medium capitalize">
                                    {user?.data?.firstName ?? '-'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    Last Name
                                </dt>
                                <dd className="text-secondary-foreground font-medium capitalize">
                                    {user?.data?.lastName ?? '-'}
                                </dd>
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col space-y-4  text-left justify-between sm:items-center">
                            <div className="text-left">
                                <dt className="text-sm  font-medium text-muted-foreground">
                                    Email
                                </dt>
                                <dd className="text-secondary-foreground font-medium capitalize">
                                    {maskNumber(`${user?.data?.email ?? '-'}`)}
                                </dd>
                            </div>
                            <div className="sm:text-right">
                                <dt className="text-sm font-medium text-muted-foreground">
                                    Phone
                                </dt>
                                <dd className="text-secondary-foreground font-medium capitalize">
                                   {maskNumber(`${user?.data?.phoneNumber ?? '-'}`)}
                                </dd>
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col space-y-4  text-left justify-between sm:items-center">
                            <div className="text-left">
                                <dt className="text-sm  font-medium text-muted-foreground">
                                    User Role
                                </dt>
                                <dd className="text-secondary-foreground font-medium capitalize">
                                    {user?.data?.role.roleName ?? '-'}
                                </dd>
                            </div>
                            <div className="sm:text-right">
                                <dt className="text-sm font-medium text-muted-foreground">
                                    Role Description
                                </dt>
                                <dd className="text-secondary-foreground font-medium capitalize">
                                    {user?.data?.role.description ?? '-'}
                                </dd>
                            </div>
                        </div>
                    </dl>
                </CardContent>
            </Card>
        </div>
    )
    
};
