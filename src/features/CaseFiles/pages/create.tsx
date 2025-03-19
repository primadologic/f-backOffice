
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
import { CaseFileStatusType, NewCaseFileType } from "@/common/Type/CaseFile/CaseFile.type";
// Data

import { CustomBackButton } from "@/components/custom-ui/custom-buttons";
import { useCaseFileStatusService, useCreateCaseFileService } from "@/service/case-files/service";
import Loader from "@/components/custom-ui/loader";





export default function CaseFileCreatePage() {

    const { register, handleSubmit, trigger, control, formState: { errors } } = useForm<NewCaseFileType>({
        defaultValues: {
            suspectNumber: "",
            statusId: "",
            remark: ""
        },
        criteriaMode: 'all',
        mode: 'onChange'
    })

    // const suspectNumber = watch("suspectNumber");
    // const status = watch("status");
    // const remarks = watch("remarks")

    const caseFileStatusQuery = useCaseFileStatusService().data;
    const caseFileStatusData: CaseFileStatusType[] = caseFileStatusQuery?.data

    const createCaseFileMutation = useCreateCaseFileService()


    const onSubmit = (data: NewCaseFileType) => {
        console.log("New Case File", data);

        createCaseFileMutation.mutateAsync(data)
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
                                        <div className="w-full flex flex-col gap-2">
                                            <label htmlFor="Status" className="form-label">Status</label>
                                            <Controller
                                                name="statusId"
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
                                                        className={`outline-none w-full border h-[3.2rem] text-sm  px-3 py-3 rounded-md font-medium text-custom_theme-primary_foreground dark:bg-custom_theme-dark_gray_1 dark:text-custom_theme-primary_background focus:ring-1 focus:ring-gray-400 dark:focus:ring-custom_theme-gray delay-150 transition ease-in-out duration-300
                                                                ${errors.statusId ? "form-validerr-ring " : "form-valid-ring"}
                                                            `}
                                                        onBlur={onBlur}
                                                    >
                                                        <SelectValue className="dark:!text-custom_theme-primary_background" placeholder="Select Status"  />
                                                    </SelectTrigger>
                                                    <SelectContent className="w-full">
                                                        {caseFileStatusData.map((option) => (
                                                            <SelectItem
                                                                key={option.statusId} 
                                                                value={option.statusId}
                                                                className="capitalize"
                                                            >
                                                                    {option.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                )}
                                            />
                                            {errors.statusId && <p className="form-error-msg">{errors.statusId.message}</p>}
                                        
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="w-full flex flex-col gap-2">
                                            <label htmlFor="remarks" className="form-label">Remarks</label>
                                            <textarea 
                                                rows={5}
                                                placeholder="Enter the remarks for the case"
                                                className={`form-input
                                                        ${errors.remark ? "form-validerr-ring" : "form-valid-ring"}
                                                    `}
                                                {...register("remark", {
                                                    required: {
                                                        value: true,
                                                        message: "Remarks are required"
                                                    }
                                                })}
                                                onBlur={() => trigger('remark')}
                                            ></textarea>
                                            {errors.remark && <p className="form-error-msg">{errors.remark.message}</p>}
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-row">
                                        <Button
                                            type="submit"
                                            className={`btn-default sm:min-w-[6.25rem]  ${
                                                createCaseFileMutation.isPending ? "sm:min-w-[6.25rem]" : "sm:max-w-max w-full"
                                            }`}
                                        >
                                            {createCaseFileMutation.isPending ? (
                                                <span className="flex items-center justify-center sm:w-[6.25rem]"> 
                                                    {/* Ensure the span has the desired width */}
                                                    <Loader />
                                                </span>
                                            ) : (
                                                <span>Submit</span>
                                            )}
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