
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

import TopNavBar from "@/components/custom-ui/topBarNav";
import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { CloudUpload, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { encrypt } from "@/lib/encryption";
import { API_BASE_URL, API_KEY } from "@/lib/env_vars";
import { accessToken } from "@/lib/tokens";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import Cookies from "js-cookie"
import Loader from "@/components/custom-ui/loader";
import { CustomBackButton } from "@/components/custom-ui/custom-buttons";



export default function ReportNumberCreatePage() {

    const { register, handleSubmit, control, reset, setValue, trigger, formState: { errors } } = useForm<CreateReportNumberType>({
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

    const [files, setFiles] = useState<File[]>([]);

    // Navigation
    const navigate = useNavigate();
    
    // Get QueryClient from the context
    const queryClient = useQueryClient()

    const getStartYear = () => {
        const startYear = 1900;
        return `${startYear}-12-31`;
    }


    // File and File Validation
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
          setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
          setValue('requestFiles', [...files, ...acceptedFiles], { shouldValidate: true });
        },
      });
    
    const removeFile = (fileName: string) => {
      const newFiles = files.filter(file => file.name !== fileName);
      setFiles(newFiles);
      setValue('requestFiles', newFiles, { shouldValidate: true });
      trigger('requestFiles');
    };


    const validateFileSize = (files: File[] | undefined): boolean | string => {
        if (!files) return true

        for (let i = 0; i < files.length; i++) {
            if (files[i].size > 5000000) { // 5 MB in bytes
                return "File size exceeds the limit of 5 MB.";
            }
        }
        return true;
    };


    const reportMutation = useMutation({
        mutationKey: ['report'],
        mutationFn: async (newData: CreateReportNumberType) => {
            try {
                // const origin: string = 'Web';
                const formData = new FormData();

               // Encrypt fields before appending - use await here
                const encryptedSuspectNumber = (await encrypt(newData.suspectNumber)).trim();
                const encryptedDescription = (await encrypt(newData.description));

                // Append non-file fields
                formData.append('suspectNumber', encryptedSuspectNumber);
                formData.append('reporterNumber', newData.reporterNumber.trim())
                formData.append('platFormId', newData.platFormId);
                formData.append('incidentDate', newData.incidentDate);
                formData.append('description', encryptedDescription);
    
                // Append files
                newData.requestFiles?.forEach(file => {
                    if (!file) return true;
                    formData.append('requestFiles', file);
                });
    
                // console.log("Sending request to:", `${API_BASE_URL}/report?origin=${origin}`);
                console.log("FormData entries:", Array.from(formData.entries()));
    
                const response = await axios.post(`${API_BASE_URL}/report/back-office`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "X-API-KEY": `${API_KEY}`,
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
    
                console.log("Response received:", response);
    
                if (response.data?.statusCode === 200) {
                    toast.success(`${response?.data?.message}`, {
                        duration: 4000
                    });

                    queryClient.invalidateQueries({ queryKey: ['report-list'] })
                    
                    setTimeout(() => {
                        navigate({ to: '/' });
                    }, 3000);
                }
    
                if (response.data?.statusCode === 201) {
                    toast.success(`${response?.data?.message}`, {
                        duration: 4000
                    });
                    setTimeout(() => {
                        Cookies.remove('accessToken');
                    }, 1000);
                }
    
                return response.data;
    
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    const code = err.response?.data?.statusCode ?? null;
                    
                    if (code === 409) {
                        toast.info(`The phone number ${err.response?.data?.message} has already been reported.`, {
                            duration: 5000
                        });
                    };

                    if (code === 400) {
                        toast.error(`${err.response?.data?.message}`, {
                            duration: 5000
                        });
                    };

                    if (code === 500) {
                        toast.error(`${err.response?.data?.message}`, {
                            duration: 5000
                        });
                    };

                    if (code === 401) {
                        toast.error("You're unauthorized, please verify your phone number.");
                        console.log("Error 401");
                        reset();
                        setFiles([]);
                        setTimeout(() => {
                            navigate({ to: '/' });
                        }, 4000);
                    }
    
                    // console.log("Error occurred while posting report:", err);
                }
                throw err; // Ensure mutation handles errors properly
            }
        },

    });
    
    const onSubmit = async (data: CreateReportNumberType) => {
        // console.log("Submitting:", data);
        try {
            const result = reportMutation.mutateAsync(data);
            console.log("Mutation result:", result);
        } catch (error) {
            console.error("Mutation error:", error);
        }
    };


    return (
       <div className="">
            <TopNavBar pageName="Reported Number" />
            <PageLayout>
                <div className="pt-7"/>
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
                                <div className="flex flex-col gap-y-5">
                                    <div className="w-full sm:flex sm:flex-row sm:gap-5 sm:justify-center sm:items-center flex flex-col gap-7">
                                        <div className="w-full flex flex-col gap-2">
                                            <label htmlFor="Suspect number" className="form-label">Suspect Number</label>
                                            <input 
                                                type="text" 
                                                placeholder="+233 000 0000"
                                                className={`form-input
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
                                                className={`form-input
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
                                                            className={` outline-none border py-3 px-3 !w-full  text-sm font-medium text-custom_theme-primary_foreground dark:bg-custom_theme-dark_gray_1 dark:text-custom_theme-primary_background focus:ring-1 focus:ring-gray-400 dark:focus:ring-custom_theme-gray delay-150 transition ease-in-out duration-300
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
                                            <input 
                                                type="date" 
                                                placeholder="Date of fraud incident"
                                                min={getStartYear()}
                                                max={new Date().toISOString().split('T')[0]}
                                                className={`form-input max-w-screen-sm w-full
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
                                            <div className="flex flex-col gap-2">
                                                <Controller
                                                    name="requestFiles"
                                                    control={control}
                                                    rules={{ required: 'This field is required', validate: validateFileSize }}
                                                    render={() => (
                                                        <>
                                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                                <input {...getInputProps()} 
                                                                     className={`form-input
                                                                        ${errors.requestFiles ? "form-validerr-ring" : "form-valid-err"}
                                                                    `}
                                                                />
                                                                <div className="form-input-file hover: flex flex-col items-center gap-3 px-10 py-8">
                                                                    <CloudUpload />
                                                                    <div className="text-center space-y-2">
                                                                        <div className="text-sm">
                                                                            Drag and drop multiple files here, or click to select files
                                                                        </div>
                                                                        <p className="text-custom_theme-primary_foreground dark:text-custom_theme-gray">
                                                                            Files are limited to only 5MB
                                                                        </p>
                                                                        <Button type="button" className="btn-dark-mode">Browse</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {errors.requestFiles && (
                                                                <span className="form-error-msg">{errors.requestFiles.message}</span>
                                                            )}
                                                            <aside className="flex flex-col gap-2 max-w-max ">
                                                                <ul className="space-y-3 list-disc ">
                                                                {files.map((file) => (
                                                                    <div key={file.name} className="flex flex-row gap-2">
                                                                        <li className="bg-white w-full px-3 line-clamp-1 text-black text-base font-medium py-1 rounded-xl flex items-center justify-between">
                                                                            {file.name}
                                                                        </li>
                                                                        <button onClick={() => removeFile(file.name)} className="ml-2 text-red-500">
                                                                            <X className="w-6 h-6 bg-white text-black rounded-full hover:bg-red-500 focus:bg-red-500 hover:text-white hover:font-bold transition-all duration-300 hover:scale-125 hover:translate-y-1" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                                </ul>
                                                            </aside>
                                                        </>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                            
                                    <div className="w-full flex flex-col gap-2">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea 
                                            rows={5}
                                            placeholder="Describe the fraud incident"
                                            className={`form-input
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


                                    <div className="w-full flex sm:flex-row flex-col sm:gap-10 gap-3">
                                        <Button
                                            type="submit"
                                            className={`btn-default sm:min-w-[6.25rem] w-full ${
                                                reportMutation.isPending ? "sm:min-w-[6.25rem]" : "sm:max-w-max w-full"
                                            }`}
                                        >
                                            {reportMutation.isPending ? (
                                                <span className="flex items-center justify-center sm:w-[6.25rem]"> {/* Ensure the span has the desired width */}
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



