

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-separator";
import PageLayout from "@/features/layout/PagesLayout";
import { Checkbox } from "@/components/ui/checkbox"
import { useForm, Controller } from "react-hook-form"
import { CreateFraudNumberType } from "@/common/Type/FraudNumber/FraudNumber.type";
import { Button } from "@/components/ui/button";
import CustomBackButton from "@/components/custom-ui/back-button";
import TopNavBar from "@/components/custom-ui/topBarNav";



const items = [
    {
        id: "reported",
        label: "Reported"
    },
    {
        id: "approved",
        label: "Approved",
    },
    {
        id: "investigated",
        label: "Investigated"
    },
    {
        id: "visibility",
        label: "Visibility"
    }

]

export default function FraudNumberCreatePage() {

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<CreateFraudNumberType>({
        defaultValues: {
            suspectNumber: "",
            reported: false,
            approved: false,
            investigated: false,
            visibility: false
        },
        criteriaMode: "firstError"
    })


    const onSubmit = (data: CreateFraudNumberType) => {
        console.log("Create Fraud Number", data)

        setTimeout(() => {
            reset()
        }, 2000)
    }

    return (
       <div className="">
            <TopNavBar pageName="Fraud Numbers" />
            <div className="pt-7"/>
            <PageLayout>
                 <Card className="rounded-[1.8rem] border">
                    <div className="w-full flex flex-row justify-between items-center">
                        <CardHeader className="flex flex-row justify-start items-center gap-x-5">
                            <CustomBackButton />
                            <div className="">
                                <CardTitle>Create Fraud Number</CardTitle>
                                <CardDescription></CardDescription>
                            </div>
                        </CardHeader>
                    </div>
                    <Separator orientation="horizontal" className="-mx-1 my-1 h-px bg-muted" />
                    <CardContent className="mt-8">
                        <div className="">
                            <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full">
                                <div className="flex flex-col gap-14">
                                    <div className="w-full sm:flex sm:flex-row sm:gap-5 sm:justify-center sm:items-center justify-center items-center flex flex-col gap-7">
                                        <div className="w-full flex flex-col gap-3">
                                            <label htmlFor="phone number" className="form-label">Suspect Number</label>
                                            <input 
                                                type="text" 
                                                placeholder="+233 000 0000"
                                                className={`form-input
                                                        ${errors.suspectNumber ? "form-validerr-ring" : "form-valid-err"}
                                                    `}
                                                {...register('suspectNumber', {
                                                    required: {
                                                        value: true,
                                                        message: "The suspect mumber is required"
                                                    },
                                                    maxLength: {
                                                        value: 15,
                                                        message: "Suspect number cannot exceed 15 characters"
                                                    }

                                                })}
                                            />
                                            {errors.suspectNumber && <p className="form-error-msg">{errors.suspectNumber?.message}</p>}
                                        </div>
                                        <div className="w-full grid grid-cols-2 items-center gap-2 max-h-[20px]">
                                            {items.map((item) => (
                                                <Controller
                                                    key={item.id}
                                                    control={control}
                                                    name={item.id as keyof Omit<CreateFraudNumberType, "suspectNumber">}  // Exclude suspectNumber
                                                    render={({ field }) => (
                                                        <div className="flex items-center space-x-2 ">
                                                            <Checkbox
                                                                checked={field.value}
                                                                id={item.id}
                                                                className=""
                                                                onCheckedChange={(checked) => field.onChange(checked)}
                                                            />
                                                            <label htmlFor={item.id} className="form-label">{item.label}</label>
                                                        </div>
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-row">
                                        <Button className="btn-dark-mode">
                                            Submit
                                        </Button>
                                    </div>

                                   
                                </div>
                            </form>
                        </div>

                    </CardContent>
                 </Card>
            </PageLayout>
       </div>
    )
    
};