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
import { UserSettingsType } from "@/common/Type/accounts-settings.type"
import { Button } from "@/components/ui/button"


export default function UserAvatarComponent({ user }: UserSettingsType) {

    return (
        <div className="">
            <Card className="border py-6 px-5">
                <CardContent className="flex sm:flex-row flex-col space-y-3 justify-between sm:items-center items-start">
                    <div className="flex flex-row justify-start items-center">
                        <Avatar className="w-20 h-20">
                             <AvatarImage 
                                 src={user.avatarUrl || 'https://github.com/shadcn.png'}
                                 className="w-full h-full object-cover"
                             />
                             <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <CardHeader>
                            <CardTitle>Default Sam</CardTitle>
                            <CardDescription className="font-medium">User Role</CardDescription>
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
