import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// Images
import blue_graph from "/assets/illustrations/blue-graph.png"
import organge_graph from "/assets/illustrations/orange-graph.png"
import red_graph from "/assets/illustrations/red-graph.png"
import { useStatReportDashboard } from "@/service/stats-report-dash.service"
  


export default function OverviewCards() {

    const getReportDashStats = useStatReportDashboard();

    const reportStats = getReportDashStats.data?.data ?? null

    return (
        <div className="">
            <div className="space-y-6">
                <div className="grid grid-cols-4 gap-6 ">
                    {reportStats?.totalReports && (
                        <Card className="max-h-max">
                            <CardHeader className="">
                                <CardTitle className="text-sm w-[8rem] whitespace-normal">Total Reports</CardTitle>
                                <CardDescription className="sr-only">Total Reported numbers on FraudWall</CardDescription>
                            </CardHeader>
                            <CardContent className="card-content">
                                <data 
                                    value={reportStats?.totalReports} 
                                    className="text-2xl font-bold"
                                >
                                    {reportStats?.totalReports}
                                </data> 
                            </CardContent>
                        <CardFooter className="w-full flex flex-row items-end justify-end">
                                <img 
                                    src={organge_graph} 
                                    alt="Blur line graph"
                                    className="object-contain "
                                />
                            </CardFooter>
                        </Card>
                    )}
                
                    {reportStats?.totalReporters && (
                        <Card className="max-h-max">
                            <CardHeader>
                                <CardTitle className="text-sm ">Total Reporters</CardTitle>
                                <CardDescription className="sr-only">Total Reporters Fraud Numbers on FraudWall</CardDescription>
                            </CardHeader>
                            <CardContent className="card-content ">
                                <data 
                                    value={reportStats?.totalReporters} 
                                    className="text-2xl font-bold"
                                >
                                    {reportStats?.totalReporters}
                                </data>
                            </CardContent>
                            <CardFooter className="w-full flex flex-row items-end justify-end">
                                <img 
                                    src={organge_graph} 
                                    alt="Blur line graph"
                                    className="object-contain "
                                />
                            </CardFooter>
                        </Card>
                    )}
                
                    {reportStats?.totalReportedFraudNumbers && (
                        <Card className="max-h-max">
                            <CardHeader>
                                <CardTitle className="text-sm">Total Reported Numbers</CardTitle>
                                <CardDescription className="sr-only">Total Reported Numbers Numbers on FraudWall</CardDescription>
                            </CardHeader>
                            <CardContent className="card-content ">
                                <data 
                                    value={reportStats?.totalReporters} 
                                    className="text-2xl font-bold"
                                >
                                    {reportStats?.totalReportedFraudNumbers}
                                </data>
                            </CardContent>
                            <CardFooter className="w-full flex flex-row items-end justify-end">
                                <img 
                                    src={organge_graph} 
                                    alt="Orange line graph"
                                    className="object-contain"
                                />
                            </CardFooter>
                        </Card>
                    )}

                    {reportStats?.totalCaseFiles && (
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="text-sm">Total Case Files</CardTitle>
                                <CardDescription className="sr-only">Total Case Files on FraudWall</CardDescription>
                            </CardHeader>
                            <CardContent className="card-content ">
                                <data 
                                    value={reportStats?.totalCaseFiles} 
                                    className="text-2xl font-bold"
                                >
                                    {reportStats?.totalCaseFiles}
                                </data>
                            </CardContent>
                            <CardFooter className="w-full flex flex-row items-end justify-end">
                                <img 
                                    src={organge_graph} 
                                    alt="Blur line graph"
                                    className="object-contain"
                                />
                            </CardFooter>
                        </Card>
                    )}
                </div>


                {/* Red Graph */}

                <div className="grid grid-cols-4 gap-6">
                    {reportStats?.totalVisibleFraudNumbers && (
                        <Card className="max-h-max">
                            <CardHeader>
                                <CardTitle className="text-sm ">Total Visibile Fraud Numbers</CardTitle>
                                <CardDescription className="sr-only">Total Reported Numbers on FraudWall</CardDescription>
                            </CardHeader>
                            <CardContent className="card-content ">
                                <data 
                                    value={reportStats?.totalVisibleFraudNumbers} 
                                    className="text-2xl font-bold"
                                >
                                    {reportStats?.totalVisibleFraudNumbers}
                                </data>
                            </CardContent>
                            <CardFooter className="w-full flex flex-row items-end justify-end">
                                <img 
                                    src={red_graph} 
                                    alt="Blur line graph"
                                    className="object-contain"
                                />
                            </CardFooter>
                        </Card>
                      )}

                    {reportStats?.totalInvestigatedFraudNumbers && (
                        <Card className="max-h-max">
                            <CardHeader>
                                <CardTitle className="text-sm">Total Investigated Fraud Numbers</CardTitle>
                                <CardDescription className="sr-only">Total Visibile Fraud Numbers on FraudWall</CardDescription>
                            </CardHeader>
                            <CardContent className="card-content ">
                                <data 
                                    value={reportStats?.totalInvestigatedFraudNumbers} 
                                    className="text-2xl font-bold"
                                >
                                    {reportStats?.totalInvestigatedFraudNumbers}
                                </data>
                            </CardContent>
                            <CardFooter className="w-full flex flex-row items-end justify-end">
                                <img 
                                    src={red_graph} 
                                    alt="Blur line graph"
                                    className="object-contain"
                                />
                            </CardFooter>
                        </Card>
                    )}

                    {reportStats?.totalApprovedFraudNumbers && (
                        <Card className="max-h-max">
                            <CardHeader>
                                <CardTitle className="text-sm">Total Approved Fraud Numbers</CardTitle>
                                <CardDescription className="sr-only">Total Visibile Fraud Numbers on FraudWall</CardDescription>
                            </CardHeader>
                            <CardContent className="card-content ">
                                <data 
                                    value={reportStats?.totalApprovedFraudNumbers} 
                                    className="text-2xl font-bold"
                                >
                                    {reportStats?.totalApprovedFraudNumbers}
                                </data>
                            </CardContent>
                            <CardFooter className="w-full flex flex-row items-end justify-end">
                                <img 
                                    src={red_graph} 
                                    alt="Red line graph"
                                    className="object-contain"
                                />
                            </CardFooter>
                        </Card>
                    )}

                </div>


                {/* Blue Graph */}
                
              
                <div className="grid grid-cols-3 gap-6">
                    {reportStats?.totalOriginsFromWeb && (
                        <Card className="max-h-max">
                            <CardHeader>
                                <CardTitle className="text-sm">Total Origins from Web</CardTitle>
                                <CardDescription className="sr-only">Total Origins on FraudWall</CardDescription>
                            </CardHeader>
                            <CardContent className="card-content ">
                                <data 
                                    value={reportStats?.totalApprovedFraudNumbers} 
                                    className="text-2xl font-bold"
                                >
                                    {reportStats?.totalOriginsFromWeb}
                                </data>
                            </CardContent>
                            <CardFooter className="w-full flex flex-row items-end justify-end">
                                <img 
                                    src={blue_graph} 
                                    alt="Blue line graph"
                                    className="object-contain"
                                />
                            </CardFooter>
                        </Card>
                    )}
                        
                    {reportStats?.totalOriginsFromUSSD && (
                        <Card className="max-h-max">
                            <CardHeader>
                                <CardTitle className="text-sm">Total Origins from USSD</CardTitle>
                                <CardDescription className="sr-only">Total Origins from USSD on FraudWall</CardDescription>
                            </CardHeader>
                            <CardContent className="card-content ">
                                <data 
                                    value={reportStats?.totalOriginsFromUSSD} 
                                    className="text-2xl font-bold"
                                >
                                    {reportStats?.totalOriginsFromUSSD}
                                </data>
                            </CardContent>
                            <CardFooter className="w-full flex flex-row items-end justify-end">
                                <img 
                                    src={blue_graph} 
                                    alt="Blue line graph"
                                    className="object-contain"
                                />
                            </CardFooter>
                        </Card>
                    )}
                    
                    {reportStats?.totalOriginsFromTelegram && (
                        <Card className="max-h-max">
                            <CardHeader>
                                <CardTitle className="text-sm">Total Origins from Telegram</CardTitle>
                                <CardDescription className="sr-only">Total Origins from Telegram on FraudWall</CardDescription>
                            </CardHeader>
                            <CardContent className="card-content ">
                                <data 
                                    value={reportStats?.totalOriginsFromTelegram} 
                                    className="text-2xl font-bold"
                                >
                                    {reportStats?.totalOriginsFromTelegram}
                                </data>
                            </CardContent>
                            <CardFooter className="w-full flex flex-row items-end justify-end">
                                <img 
                                    src={blue_graph} 
                                    alt="Blue line graph"
                                    className="object-contain"
                                />
                            </CardFooter>
                        </Card>
                    )}
                </div>


            </div>
        </div>
    )
};
