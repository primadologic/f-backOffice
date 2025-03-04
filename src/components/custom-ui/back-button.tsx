"use client"
import { useRouter } from "next/navigation"
import { CustomButton } from "./buttons"
import { ArrowLeft } from "lucide-react"

export default function CustomBackButton() { 

    const router = useRouter()

    return (

        <>
            <CustomButton 
                className="dark:bg-button_colors-primary_2 bg-button_colors-light_warning  text-[2rem] !rounded-full w-10 h-10 dark:ring-2 dark:ring-button_colors-primary_2  delay-150 transition ease-in-out duration-300"
                onClick={() => router.back()}
            >   
                    <ArrowLeft strokeWidth={2.5} size={24} className="dark:text-button_colors-dark_gray text-button_colors-deep_warning" />
            </CustomButton>
        </>
        
    )
    
};
