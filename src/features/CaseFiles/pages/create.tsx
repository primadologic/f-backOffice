import CustomBackButton from "@/components/custom-ui/back-button";
import TopNavBar from "@/components/custom-ui/topBarNav";
import PageLayout from "@/features/layout/PagesLayout";
import { Separator } from "@radix-ui/react-separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {useForm, Controller} from "react-hook-form"
import { Button } from "@/components/ui/button";


// Types
import { NewCaseFileType } from "@/common/Type/CaseFile/CaseFile.type";
import { CaseStatusType,   } from "@/common/Type/CaseFile/CaseStatus.type";
// Data
import { CaseStatusData } from "@/data/CaseFiles/CaseStatus.table.data";






export default function CaseFileCreatePage() {

    const { register, handleSubmit, trigger, control, formState: { errors } } = useForm<NewCaseFileType>({
        defaultValues: {
            suspectNumber: "",
            status: "",
            remarks: ""
        },
        criteriaMode: "firstError"
    })

    // const suspectNumber = watch("suspectNumber");
    // const status = watch("status");
    // const remarks = watch("remarks")


    const onSubmit = (data: NewCaseFileType) => {
        console.log("New Case File", data);
    }


    return (
       <div className="">
            <TopNavBar pageName="Case File" />
            <PageLayout>
                <div className="pt-7"/>
                 <Card className="rounded-[1.8rem] border">
                    <div className="w-full flex flex-row justify-between items-center">
                        <CardHeader className="flex flex-row justify-start items-center gap-x-5">
                            <CustomBackButton />
                            <div className="">
                                <CardTitle>Create Case File</CardTitle>
                                <CardDescription></CardDescription>
                            </div>
                        </CardHeader>
                        
                    </div>
                    <Separator orientation="horizontal" className="-mx-1 my-1 h-px bg-muted" />
                    <CardContent className="mt-8">
                        <div className="">
                            <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full">
                                <div className="flex flex-col gap-y-7">
                                    <div className="w-full sm:flex sm:flex-row sm:gap-5 sm:justify-center sm:items-center flex flex-col gap-7">
                                        <div className="w-full flex flex-col gap-2">
                                            <label htmlFor="suspect number" className="form-label">
                                                Suspect Number
                                            </label>
                                            <input 
                                                type="text" 
                                                placeholder="+233 000 0000"
                                                className={`form-input
                                                        ${errors.suspectNumber ? "form-validerr-ring" : "form-valid-ring"}
                                                    `}
                                                {...register('suspectNumber', {
                                                    required: {
                                                        value: true,
                                                        message: "Suspect number is required",
                                                    },
                                                    maxLength: {
                                                        value: 15,
                                                        message: "Phone number cannot exceed 15 characters"
                                                    }
                                                })} 
                                                onBlur={() => trigger('suspectNumber')}
                                            />
                                            {errors.suspectNumber && <p className="form-error-msg">{errors.suspectNumber?.message}</p>}
                                        </div>
                                        <div className="w-full flex flex-col gap-2 ">
                                            <label htmlFor="Status" className="form-label">Status</label>
                                            <Controller
                                                name="status"
                                                control={control}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "A status must me select"
                                                    }
                                                }}
                                                render={({ field: { onBlur, value, onChange } }) => (
                                                <Select onValueChange={onChange} defaultValue={value}>
                                                    <SelectTrigger 
                                                        className={`outline-none border h-[3.2rem] text-sm  px-3 py-3 rounded-md font-medium text-custom_theme-primary_foreground dark:bg-custom_theme-dark_gray_1 dark:text-custom_theme-primary_background focus:ring-1 focus:ring-gray-400 dark:focus:ring-custom_theme-gray delay-150 transition ease-in-out duration-300
                                                                ${errors.status ? "form-validerr-ring " : "form-valid-ring"}
                                                            `}
                                                        onBlur={onBlur}
                                                    >
                                                        <SelectValue className="dark:!text-custom_theme-primary_background" placeholder="Select Status"  />
                                                    </SelectTrigger>
                                                    <SelectContent className="w-full">
                                                        {CaseStatusData.map((statusOption: CaseStatusType) => (
                                                            <SelectItem key={statusOption.statusId} value={statusOption.statusId}>{statusOption.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                )}
                                            />
                                            {errors.status && <p className="form-error-msg">{errors.status.message}</p>}
                                        
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="w-full flex flex-col gap-2">
                                            <label htmlFor="remarks" className="form-label">Remarks</label>
                                            <textarea 
                                                rows={5}
                                                placeholder="Enter the remarks for the case"
                                                className={`form-input
                                                        ${errors.remarks ? "form-validerr-ring" : "form-valid-ring"}
                                                    `}
                                                {...register("remarks", {
                                                    required: {
                                                        value: true,
                                                        message: "Remarks are required"
                                                    }
                                                })}
                                                onBlur={() => trigger('remarks')}
                                            ></textarea>
                                            {errors.remarks && <p className="form-error-msg">{errors.remarks.message}</p>}
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