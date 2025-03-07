import { Label, LabelList, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import { useEffect, useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useVerificationbyOriginReport } from "@/service/stats-verify-report.service"

// Chart configuration for different platforms
const chartConfig: Record<string, { label: string; color?: string }> =  {
    fraud: {
        label: "Verifications"
    },
    Web: {
        label: "Web",
        color: "hsl(var(--origin-wa))"
    },
    Telegram: {
        label: "Telegram",
       color: "hsl(var(--origin-tg))"
    },
    USSD: {
        label: "USSD",
       color: "hsl(var(--chart-3))"
    },
    Instagram: {
        label: "Instagram",
        color: "hsl(var(--origin-ig))"
    },
    Facebook: {
        label: "Facebook",
        color: "hsl(var(--origin-fb))"
    },
    WhatsApp: {
        label: "WhatsApp",
        color: "hsl(var(--origin-wa))"
    },
    x: {
        label: "X",
        color: "hsl(var(--chart-2))"
    },
    Portal: {
        label: "Portal",
        color: "hsl(var(--origin-portal))"
    }
} satisfies ChartConfig



export default function VerificationbyOriginReportChart() {


  const [yearOptions, setYearOptions] = useState<number[]>([])
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
//   const [loading, setLoading] = useState<boolean>(false)
//   const [verificationData, setVerificationData] = useState<any>(null)

  const verificationbyOrigin = useVerificationbyOriginReport(selectedYear)

  // Prepare data for the chart
  const chartData = useMemo(() => {
    if (!verificationbyOrigin?.data?.data) return [];
  
    const { platformPercentagesFromVerification = {}, verificationOriginCount = [] } = verificationbyOrigin.data.data;
  
    const totalCount = verificationOriginCount.reduce((a: number, b: number) => a + b, 0);
  
    return Object.keys(chartConfig).map((origin) => {
      const percentage = platformPercentagesFromVerification[origin] || 0;
      return {
        origin,
        fraud: Math.round((percentage * totalCount) / 100),
        fill: chartConfig[origin]?.color || "gray",
      };
    });
  }, [verificationbyOrigin]);
  

  // Calculate total verifications
  const totalVerifications = useMemo(() => {
    if (!chartData.length) return 0
    return chartData.reduce((acc, curr) => acc + curr.fraud, 0)
  }, [chartData])

  // Generate year options (current year and 4 previous years)
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i)
    setYearOptions(years)
    
    // Set initial selected year to current year
    setSelectedYear(currentYear)
  }, [])

  // Fetch data when selectedYear changes



  return (
    <Card className="sm:w-[35vw] w-full flex flex-col">
      <CardHeader className="pb-0 flex flex-row justify-between items-center">
        <div>
          <CardTitle>Verification by Origin</CardTitle>
          <CardDescription className="text-custom_theme-gray text-sm">
            {verificationbyOrigin.isLoading ? "Loading..." : `${selectedYear} Statistics`}
          </CardDescription>
        </div>
        <Select
          value={selectedYear.toString()}
         
          onValueChange={(value) => {
            console.log("Selected Year:", value);  // Debugging
            setSelectedYear(Number(value));
          }}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {verificationbyOrigin?.isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            Loading data...
          </div>
        ) : chartData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[300px] my-5"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="fraud"
                nameKey="origin"
                outerRadius={100}
                innerRadius={55}
                strokeWidth={2.5}
                cornerRadius={5} // Adds rounded corners to each slice
                paddingAngle={15} // Adds space between slices
                activeIndex={0}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
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
                      className=""
                    >
                      {payload.fraud}
                    </text>
                  )
                }}
              >
                <LabelList
                  dataKey="origin"
                  className="fill-background"
                  stroke="var(--primary-color)"
                  fontSize={13}
                  formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
                />

                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVerifications.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Verifications
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                    content={
                        <ChartLegendContent
                          nameKey="origin"
                        />
                    }
                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No verification data available for {selectedYear}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Showing the phone number verification by origin
        </div>
        <div className="leading-none text-muted-foreground">
          {verificationbyOrigin?.isLoading ? 
            `Data for ${selectedYear} showing ${totalVerifications} total verifications` : 
            "Select a year to view verification statistics"}
        </div>
      </CardFooter>
    </Card>
  )
}