// import { Separator } from "@radix-ui/react-separator";
import {type LucideIcon } from "lucide-react"


type TopNavBarType = {
    pageName: string;
    icon?: LucideIcon;
}


export default function TopNavBar({pageName, icon: Icon}: TopNavBarType) {

    // const router = useRouter()

    return (
        <div className="lg:w-full lg:flex lg:flex-col lg:justify-between lg:items-start  w-full  flex flex-col gap-y-2">
            <div className="lg:flex lg:flex-row lg:justify-between lg:gap-10 flex flex-row justify-between">
                <h2 className="flex flex-row gap-3 items-center text-custom-black2 font-bold capitalize text-[25px] dark:text-custom_theme-primary_background">
                    {Icon && <Icon size={24} />}
                    {pageName}
                </h2>
            </div>
            {/* <Separator orientation="horizontal" className="w-full h-[1px] bg-[#E5E7E8] dark:bg-zinc-800" /> */}
        </div>
    )
    
};
