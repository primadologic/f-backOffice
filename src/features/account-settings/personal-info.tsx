import { UserSettingsType } from "@/common/Type/accounts-settings.type";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PencilLine } from "lucide-react";


export default function UserInfoComponent({ user }: UserSettingsType) {

    return (
        <div className="">
            <Card  className="border py-3 px-5">
                <CardHeader className="flex flex-row justify-between items-start">
                    <CardTitle>Personal Information</CardTitle>
                    <Button
                        variant={"ghost"}
                        size={'sm'}
                        className="space-x-1 border px-4 !rounded-2xl"
                    >
                        <span>Edit</span>
                        <span><PencilLine  /></span>
                    </Button>
                </CardHeader>
                <CardContent className="w-[40vw]">
                    <dl className="space-y-2 flex flex-col justify-between gap-4">
                        <div className="flex sm:flex-row flex-col space-y-4  text-left justify-between">
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    First Name
                                </dt>
                                <dd className="text-secondary-foreground font-medium">
                                    Sam
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-muted-foreground">
                                    Last Name
                                </dt>
                                <dd className="text-secondary-foreground font-medium">
                                    Adranyi
                                </dd>
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col space-y-4  text-left justify-between">
                            <div className="text-left">
                                <dt className="text-sm  font-medium text-muted-foreground">
                                    Email
                                </dt>
                                <dd className="text-secondary-foreground font-medium">
                                    s.adranyi@outlook.com
                                </dd>
                            </div>
                            <div className="sm:text-right">
                                <dt className="text-sm font-medium text-muted-foreground">
                                    Phone
                                </dt>
                                <dd className="text-secondary-foreground font-medium">
                                    +233 00 000 0000
                                </dd>
                            </div>
                        </div>
                        <div className="flex sm:flex-row flex-col space-y-4  text-left justify-between">
                            <div className="text-left">
                                <dt className="text-sm  font-medium text-muted-foreground">
                                    User Role
                                </dt>
                                <dd className="text-secondary-foreground font-medium">
                                    Admin
                                </dd>
                            </div>
                            <div className="sm:text-right">
                                <dt className="text-sm font-medium text-muted-foreground">
                                    Description
                                </dt>
                                <dd className="text-secondary-foreground font-medium">
                                    Adminstrator
                                </dd>
                            </div>
                        </div>
                    </dl>
                </CardContent>
            </Card>
        </div>
    )
    
};
