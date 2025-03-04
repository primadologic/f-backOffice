
import { LabelList, Pie, PieChart } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Data
import { DailyBrowserData } from "@/data/analytics/PageViews.chart.data";

  

const chartConfig = {

    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))"
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-3))"
    },
    firefox: {
        label: "FireFox",
        color: "hsl(var(--chart-4))"
    }

} satisfies ChartConfig;



export function  BrowserChartComponent()  {

    const pieData = DailyBrowserData[DailyBrowserData.length - 1].data;

    return (
        <Card className="" >
            <CardHeader className="items-center pb-0">
                <CardTitle>Browsers Insights</CardTitle>
                <CardDescription>Browsers users are using to access FraudWall.ai</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 pt-4">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="visitors" hideLabel/>} />
                        {/* <Pie data={pieData} dataKey="visitors" label nameKey={"browser"}>
                            <LabelList
                                dataKey="browser"
                                className="fill-background"
                                stroke="none"
                                fontSize={13}
                                formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
                            />
                        </Pie> */}
                        <Pie
                            data={pieData}
                            dataKey="visitors"
                            labelLine={true}
                            outerRadius={90}
                            strokeWidth={2.5}
                            
                            label={({ payload, ...props }) => {
                                return (
                                <text
                                    cx={props.cx}
                                    cy={props.cy}
                                    x={props.x}
                                    y={props.y}
                                    textAnchor={props.textAnchor}
                                    dominantBaseline={props.dominantBaseline}
                                    fill="hsla(var(--foreground))"
                                >
                                    {payload.visitors}
                                </text>
                                )
                            }}
                            nameKey="browser"
                        >
                            <LabelList
                                dataKey="browser"
                                className="fill-background"
                                stroke="var(--primary-color)"
                                fontSize={13}
                                formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
                <CardFooter className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                        {/* Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /> */}
                        <div className="leading-none text-muted-foreground">Showing total visitors for the last 30 days</div>
                    </div>

                </CardFooter>

            </CardContent>

        </Card>
    )
}