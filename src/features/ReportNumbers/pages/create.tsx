
import PageLayout from "@/features/layout/PagesLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ReportPlatformData } from "@/data/ReportNumbers/ReportPlatform.table.data";
import { useForm, Controller } from "react-hook-form"
import { CreateReportNumberType } from "@/data/ReportNumbers/ReportNumbers.type";
import { Button } from "@/components/ui/button";
import CustomBackButton from "@/components/custom-ui/back-button";
import TopNavBar from "@/components/custom-ui/topBarNav";





export default function ReportNumberCreatePage() {

    const { register, handleSubmit, control, formState: { errors } } = useForm<CreateReportNumberType>({
        defaultValues: {
            reporterNumber: "",
            suspectNumber: "",
            incidentDate: "",
            platFormId: "",
            description: "",
            requestFiles: [] 
        },
        criteriaMode: "firstError"
    })

    const getStartYear = () => {
        const startYear = 1900;
        return `${startYear}-12-31`;
    }


    const onSubmit = (data: CreateReportNumberType) => {
        console.log("Create Report Number", data)
    }

    return (
       <div className="">
            <TopNavBar pageName="Reported Number" />
            <PageLayout>
                 <Card className="rounded-[1.8rem] border">
                    <div className="w-full flex flex-row justify-between items-center">
                        <CardHeader className="flex flex-row justify-start items-center gap-x-5">
                            <CustomBackButton />
                          <div className="">
                            <CardTitle>Report Number</CardTitle>
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
                                            <label htmlFor="Suspect number" className="form-label">Suspect Number</label>
                                            <input 
                                                type="text" 
                                                placeholder="+233 000 0000"
                                                className={`outline-none border px-3 py-3 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300
                                                        ${errors.suspectNumber ? "form-validerr-ring" : "form-valid-ring"}
                                                    `} 
                                                {...register('suspectNumber', {
                                                    required: {
                                                        value: true,
                                                        message: "Suspect number is required"
                                                    },
                                                    maxLength: {
                                                        value: 15,
                                                        message: "Suspect number cannot exceed 15 characters"
                                                    }
                                                })}
                                            />
                                            {errors.suspectNumber && <p className="form-error-msg">{errors.suspectNumber?.message}</p>}
                                        </div>
                                        <div className="w-full flex flex-col gap-2 ">
                                            <label htmlFor="Reporter number" className="form-label">Reporter&apos;s Number</label>
                                            <input 
                                                type="text" 
                                                placeholder="+233 000 0000"
                                                className={`outline-none border px-3 py-3 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300
                                                        ${errors.reporterNumber ? "form-validerr-ring" : "form-valid-ring"}
                                                    `} 
                                                {...register("reporterNumber", {
                                                    required: {
                                                        value: true,
                                                        message: "Reporter number is required"
                                                    },
                                                    maxLength: {
                                                        value: 15,
                                                        message: "Reporter number cannot exceed 15 characters"
                                                    }
                                                })}
                                            />
                                            {errors.reporterNumber && <p className="form-error-msg">{errors.reporterNumber?.message}</p>}
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <label htmlFor="Status"  className="form-label">Report Platform</label>
                                            <Controller
                                                name="platFormId"
                                                control={control}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "Platform Id is required"
                                                    }
                                                }}
                                                render={({ field: {onBlur, value, onChange} }) => (
                                                    <Select onValueChange={onChange} defaultValue={value}>
                                                        <SelectTrigger 
                                                            onBlur={onBlur}
                                                            className={`outline-none border h-[3.2rem] px-3 py-3 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300
                                                                    ${errors.platFormId ? "form-validerr-ring " : "form-valid-ring"}
                                                                `}
                                                        >
                                                            <SelectValue placeholder="Select Status"  />
                                                        </SelectTrigger>
                                                        <SelectContent className="w-full">
                                                            {ReportPlatformData.map((platform) => (
                                                                <SelectItem key={platform.id} value={platform.id}>{platform.displayName}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            {errors.platFormId && <p className="form-error-msg">{errors.platFormId?.message}</p>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <div className="w-full flex flex-col gap-2">
                                            <label htmlFor="incident_date"  className="form-label">Incident Date</label>
                                            <input type="date" placeholder="Date of fraud incident"
                                                min={getStartYear()}
                                                max={new Date().toISOString().split('T')[0]}
                                                className={`outline-none border px-3 py-3 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300
                                                        ${errors.incidentDate ? "form-validerr-ring" : "form-valid-ring"}
                                                    `}
                                                {...register('incidentDate', {
                                                    required: {
                                                        value: true,
                                                        message: "Date of fraud incident is required"
                                                    }
                                                })}
                                            />
                                            {errors.incidentDate && <p className="form-error-msg">{errors.incidentDate?.message}</p>}
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <label htmlFor="incident_date"  className="form-label">Request Files</label>
                                            <input type="file" multiple placeholder="Show Evidence of fraud incident"
                                                className={`outline-none border px-3 py-3 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300
                                                        ${errors.requestFiles ? "form-validerr-ring" : "form-valid-err"}
                                                    `}
                                            />
                                            {errors.requestFiles && <p className="form-error-msg">{errors.requestFiles?.message}</p>}
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="w-full flex flex-col gap-2">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <textarea 
                                                rows={5}
                                                placeholder="Describe the fraud incident"
                                                className={`outline-none border px-3 py-3 rounded-md focus:ring-1 focus:ring-gray-400 delay-150 transition ease-in-out duration-300
                                                        ${errors.description ? "form-validerr-ring" : "form-valid-err"}
                                                    `}
                                                {...register('description', {
                                                    required: {
                                                        value: true,
                                                        message: "Description of the fraud incident is required"
                                                    }
                                                })}
                                            ></textarea>
                                            {errors.description && <p className="form-error-msg">{errors.description?.message}</p>}
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-row">
                                        <Button className="">
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

