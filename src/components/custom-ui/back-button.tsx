


import { useNavigateBack } from "@/hooks/useNavigateBack"
import { CustomButton } from "./buttons"
import { ArrowLeft } from "lucide-react"


export default function CustomBackButton() { 

    const navigateBack = useNavigateBack()
    
    return (

        <>
            <CustomButton 
                className="btn-dark-mode bg-button_colors-light_warning  text-[2rem] !rounded-full w-10 h-10 dark:focus:ring-2 dark:focus:ring-button_colors-primary_2  delay-150 transition ease-in-out duration-300"
                onClick={navigateBack}
            >   
                    <ArrowLeft strokeWidth={2.5} size={24} className="text-button_colors-deep_warning dark:text-custom_theme-primary_background" />
            </CustomButton>
        </>
        
    )
    
};
