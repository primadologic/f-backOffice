import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PageViewschartData } from "@/data/analytics/PageViews.chart.data"




const PageViewsChartConfig = {
    views: {
        label: "Page Views"
    },
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))"
    }
} satisfies ChartConfig


export default function PageViewsComponent() {

    const [activeChart, setActiveChart] = React.useState<keyof typeof PageViewsChartConfig>('desktop');

    const total = React.useMemo(
        () => ({
          desktop: PageViewschartData.reduce((acc, curr) => acc + curr.desktop, 0),
          mobile: PageViewschartData.reduce((acc, curr) => acc + curr.mobile, 0),
        }),
        [],
    )

    return (
        <Card  className="">
            <CardHeader className=" flex  flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="w-full flex flex-row justify-between">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>FraudWall page views</CardTitle>
                        <CardDescription>Showing total visitors for the last 30 days.</CardDescription>
                    </div>
                    <div className="flex">
                        {["desktop", "mobile"].map((key) => {
                            const chart = key as keyof typeof PageViewsChartConfig;
                            return (
                                <button
                                    key={chart}
                                    data-active={activeChart === chart}
                                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                    onClick={() => setActiveChart(chart)}
                                >
                                    <span className="text-xs text-muted-foreground">{PageViewsChartConfig[chart].label}</span>
                                    <span className="text-lg font-bold leading-none sm:text-3xl">
                                        {total[key as keyof typeof total].toLocaleString()}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-2  sm:p-6">
                <ChartContainer config={PageViewsChartConfig} className="aspect-auto h-[250px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={PageViewschartData}
                        margin={{
                            left: 12,
                            right: 12
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <YAxis 
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            domain={[0, "auto"]} // Auto scales based on data
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric"
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric"
                                        })
                                  }}
                                />
                            }
                        />
                        <Bar  dataKey={activeChart} fill={` var(--color-${activeChart}) `}/>
                    </BarChart>
                </ChartContainer>   
            </CardContent>
        </Card>
    )
}
