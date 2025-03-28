import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"



const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "capitalize btn-dark-mode btn-padding font-medium flex flex-row items-center gap-[.2rem]",
        create: 'bg-custom_theme-primary_foreground text-custom_theme-primary_background dark:text-custom_theme-primary_background dark:bg-custom_theme-gray2 dark:hover:bg-custom_theme-gray_hover'
        
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}


const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps> (
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp 
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        ) 
    }
)

CustomButton.displayName = "Custom Button"

export { CustomButton, buttonVariants }