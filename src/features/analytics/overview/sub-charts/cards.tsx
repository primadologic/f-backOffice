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
// import green_graph from "/assets/illustrations/green-graph.png"
import organge_graph from "/assets/illustrations/orange-graph.png"
import red_graph from "/assets/illustrations/red-graph.png"
  


export default function OverviewCards() {

    return (
        <div className="">
            <div className="space-y-6">
              
                <div className="grid grid-cols-4 gap-6 ">
                   
                    <Card className="max-h-max">
                        <CardHeader className="">
                            <CardTitle className="text-sm w-[8rem] whitespace-normal">Total Reports</CardTitle>
                            <CardDescription className="sr-only">Total Reported numbers on FraudWall</CardDescription>
                        </CardHeader>
                        <CardContent className="card-content">
                            <data value="" className="text-2xl font-bold">60</data>
                        </CardContent>
                       <CardFooter className="w-full flex flex-row items-end justify-end">
                            <img 
                                src={organge_graph} 
                                alt="Blur line graph"
                                className="object-contain "
                            />
                        </CardFooter>
                    </Card>
                
                
                    <Card className="max-h-max">
                        <CardHeader>
                            <CardTitle className="text-sm ">Total Reporters</CardTitle>
                            <CardDescription className="sr-only">Total Reporters Fraud Numbers on FraudWall</CardDescription>
                        </CardHeader>
                        <CardContent className="card-content ">
                            <data value="" className="text-2xl font-bold">60</data>
                        </CardContent>
                        <CardFooter className="w-full flex flex-row items-end justify-end">
                            <img 
                                src={organge_graph} 
                                alt="Blur line graph"
                                className="object-contain "
                            />
                        </CardFooter>
                    </Card>
                
                
                    <Card className="max-h-max">
                        <CardHeader>
                            <CardTitle className="text-sm">Total Reported Numbers</CardTitle>
                            <CardDescription className="sr-only">Total Reported Numbers Numbers on FraudWall</CardDescription>
                        </CardHeader>
                        <CardContent className="card-content ">
                            <data value="" className="text-2xl font-bold">60</data>
                        </CardContent>
                        <CardFooter className="w-full flex flex-row items-end justify-end">
                            <img 
                                src={organge_graph} 
                                alt="Blur line graph"
                                className="object-contain"
                            />
                        </CardFooter>
                    </Card>

                    <Card className="">
                        <CardHeader>
                            <CardTitle className="text-sm">Total Case Files</CardTitle>
                            <CardDescription className="sr-only">Total Case Files on FraudWall</CardDescription>
                        </CardHeader>
                        <CardContent className="card-content ">
                            <data value="" className="text-2xl font-bold">60</data>
                        </CardContent>
                        <CardFooter className="w-full flex flex-row items-end justify-end">
                            <img 
                                src={organge_graph} 
                                alt="Blur line graph"
                                className="object-contain"
                            />
                       </CardFooter>
                    </Card>
                </div>


                {/* Red Graph */}

                <div className="grid grid-cols-4 gap-6">
                
                    <Card className="max-h-max">
                        <CardHeader>
                            <CardTitle className="text-sm w-[8rem] whitespace-normal">Total Visibile Fraud Numbers</CardTitle>
                            <CardDescription className="sr-only">Total Reported Numbers on FraudWall</CardDescription>
                        </CardHeader>
                        <CardContent className="card-content ">
                            <data value="" className="text-2xl font-bold">60</data>
                        </CardContent>
                        <CardFooter className="w-full flex flex-row items-end justify-end">
                            <img 
                                src={red_graph} 
                                alt="Blur line graph"
                                className="object-contain"
                            />
                        </CardFooter>
                    </Card>
            
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="text-sm w-[8rem] whitespace-normal">Total Investigated Fraud Numbers</CardTitle>
                            <CardDescription className="sr-only">Total Visibile Fraud Numbers on FraudWall</CardDescription>
                        </CardHeader>
                        <CardContent className="card-content ">
                            <data value="" className="text-2xl font-bold">60</data>
                        </CardContent>
                        <CardFooter className="w-full flex flex-row items-end justify-end">
                            <img 
                                src={red_graph} 
                                alt="Blur line graph"
                                className="object-contain"
                            />
                        </CardFooter>
                    </Card>


                    <Card className="">
                        <CardHeader>
                            <CardTitle className="text-sm w-[8rem] whitespace-normal">Total Approved Fraud Numbers</CardTitle>
                            <CardDescription className="sr-only">Total Visibile Fraud Numbers on FraudWall</CardDescription>
                        </CardHeader>
                        <CardContent className="card-content ">
                            <data value="" className="text-2xl font-bold">60</data>
                        </CardContent>
                        <CardFooter className="w-full flex flex-row items-end justify-end">
                            <img 
                                src={red_graph} 
                                alt="Blur line graph"
                                className="object-contain"
                            />
                        </CardFooter>
                    </Card>
                
                
                    <Card className="">
                        <CardHeader>
                            <CardTitle className="text-sm w-[8rem] whitespace-normal">Total Reporters </CardTitle>
                            <CardDescription className="sr-only">Total Reporters on FraudWall</CardDescription>
                        </CardHeader>
                        <CardContent className="card-content ">
                            <data value="" className="text-2xl font-bold">60</data>
                        </CardContent>
                        <CardFooter className="w-full flex flex-row items-end justify-end">
                            <img 
                                src={red_graph} 
                                alt="Blur line graph"
                                className="object-contain"
                            />
                        </CardFooter>
                    </Card>
                
                </div>


                {/* Blue Graph */}

                <div className="grid grid-cols-3 gap-6">
                    <Card className="max-h-max">
                        <CardHeader>
                            <CardTitle className="text-sm">Total Origins from Web</CardTitle>
                            <CardDescription className="sr-only">Total Origins on FraudWall</CardDescription>
                        </CardHeader>
                        <CardContent className="card-content ">
                            <data value="" className="text-2xl font-bold">60</data>
                        </CardContent>
                        <CardFooter className="w-full flex flex-row items-end justify-end">
                            <img 
                                src={blue_graph} 
                                alt="Blur line graph"
                                className="object-contain"
                            />
                        </CardFooter>
                    </Card>
                        
                    
                    <Card className="max-h-max">
                        <CardHeader>
                            <CardTitle className="text-sm">Total Origins from USSD</CardTitle>
                            <CardDescription className="sr-only">Total Origins from USSD on FraudWall</CardDescription>
                        </CardHeader>
                        <CardContent className="card-content ">
                            <data value="" className="text-2xl font-bold">60</data>
                        </CardContent>
                        <CardFooter className="w-full flex flex-row items-end justify-end">
                            <img 
                                src={blue_graph} 
                                alt="Blur line graph"
                                className="object-contain"
                            />
                        </CardFooter>
                    </Card>
                    
                    <Card className="max-h-max">
                        <CardHeader>
                            <CardTitle className="text-sm">Total Origins from Telegram</CardTitle>
                            <CardDescription className="sr-only">Total Origins from Telegram on FraudWall</CardDescription>
                        </CardHeader>
                        <CardContent className="card-content ">
                            <data value="" className="text-2xl font-bold">60</data>
                        </CardContent>
                        <CardFooter className="w-full flex flex-row items-end justify-end">
                            <img 
                                src={blue_graph} 
                                alt="Blur line graph"
                                className="object-contain"
                            />
                        </CardFooter>
                    </Card>
                </div>


            </div>
        </div>
    )
};
