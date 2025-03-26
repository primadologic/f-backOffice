import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { PencilLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserResponse } from "@/service/accounts/fetchCurrentUser"



export default function UserAvatarComponent({ user }: {user: UserResponse} ) {

    return (
        <div className="">
            <Card className="border py-6 px-5">
                <CardContent className="flex sm:flex-row flex-col space-y-3 justify-between sm:items-center items-start">
                    <div className="flex flex-row justify-start items-center">
                        <Avatar className="w-20 h-20">
                             <AvatarImage 
                                 src={user?.data?.avatarUrl || 'https://github.com/shadcn.png'}
                                 className="w-full h-full object-cover"
                             />
                             <AvatarFallback className="uppercase text-lg">{user?.data?.firstName.at(0)}{user?.data?.lastName.at(0)}</AvatarFallback>
                        </Avatar>
                        <CardHeader>
                            <CardTitle className="capitalize">{user?.data?.firstName + " " + user.data?.lastName}</CardTitle>
                            <CardDescription className="font-medium capitalize">{user?.data?.role.roleName}</CardDescription>
                        </CardHeader>
                    </div>
                    <div className="">
                        <Button
                            variant={"ghost"}
                            size={'sm'}
                            className="space-x-1 border px-4 !rounded-2xl"
                        >
                            <span>Edit</span>
                            <span><PencilLine  /></span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
    
};
