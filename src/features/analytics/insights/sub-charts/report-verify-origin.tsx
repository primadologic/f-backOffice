 import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useVerificationbyOriginReport } from '@/service/stats-verify-report.service';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


// Define interfaces for our data structure
interface ApiResponseData {
  year: number;
  reportOriginCount: number[];
  verificationOriginCount: number[];
  platformPercentagesFromReports: Record<string, number>;
  platformPercentagesFromVerification: Record<string, number>;
}

interface ApiResponse {
  message: string;
  statusCode: number;
  data: ApiResponseData;
}

interface ChartDataPoint {
  month: string;
  reportOrigin: number;
  verificationOrigin: number;
}

type ChartType = "reportOrigin" | "verificationOrigin";



const YearlyStatisticsbyOriginChart = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  const { data: apiResponse, isLoading, isError, error } = useVerificationbyOriginReport(selectedYear);
  
  const [activeChart, setActiveChart] = useState<ChartType>("verificationOrigin");
  
  const chartConfig = {
    reportOrigin: {
      label: "Report Origins",
      color: "hsl(var(--chart-1))"
    },
    verificationOrigin: {
      label: "Verification Origins",
      color: "hsl(var(--chart-2))"
    }
  };

  // Generate year options (current year and 4 previous years)
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    setYearOptions(years);
    
    // Set initial selected year to current year
    setSelectedYear(currentYear);
  }, []);

  const formatChartData = (response: ApiResponse | undefined): ChartDataPoint[] => {
    if (!response || !response.data) return [];
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return months.map((month, index) => ({
      month,
      reportOrigin: response.data.reportOriginCount[index] || 0,
      verificationOrigin: response.data.verificationOriginCount[index] || 0
    }));
  };

  const chartData = formatChartData(apiResponse as ApiResponse);
  const data = apiResponse?.data || { reportOriginCount: [], verificationOriginCount: [] };
  
  const total = useMemo(
    () => ({
      reportOrigin: data.reportOriginCount?.reduce((acc: number, curr: number) => acc + curr, 0) || 0,
      verificationOrigin: data.verificationOriginCount?.reduce((acc: number, curr: number) => acc + curr, 0) || 0,
    }),
    [data?.reportOriginCount, data?.verificationOriginCount]
  );


  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center items-center h-64">
          Loading data...
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full">
        <CardContent className="text-red-500">
          Error loading data: {(error as Error)?.message || "Unknown error"}
        </CardContent>
      </Card>
    );
  }

  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Monthly Statistics ({selectedYear})</CardTitle>
          <CardDescription>Showing report origins and verification origins by month</CardDescription>
        </div>
        <div className="flex">
          {(Object.keys(chartConfig) as Array<keyof typeof chartConfig>).map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs text-muted-foreground">{chartConfig[key].label}</span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      
      <div className="p-4 flex justify-end">
          <div className="flex items-center">
            <label htmlFor="yearSelect" className="mr-2 font-medium">Filter by Year:</label>
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
          </div>
      </div>

        <CardContent className="px-2 sm:p-6 ">
            <ChartContainer config={chartConfig} className="h-[15rem] aspect-auto w-full">
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                    left: 12,
                    right: 12,
                    }}
                >
                    <CartesianGrid vertical={true} />
                    {/* <YAxis 
                        tickLine={true}
                        axisLine={true}
                        tickMargin={8}
                        domain={[0, "auto"]} // Auto scales based on data
                    />
                    <XAxis
                    dataKey="month"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        })
                    }}
                    /> */}
                    <XAxis dataKey="month" 
                        tickLine={true}
                        axisLine={true}
                        tickMargin={8}
                    />
                    <YAxis 
                        tickLine={true}
                        axisLine={true}
                        tickMargin={8}
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
                                year: "numeric",
                                })
                            }}
                        />
                    }
                    />
                    <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    {/* <Bar dataKey="reportOrigin" name="Report Origins" fill={chartConfig.reportOrigin.color} />
                    <Bar dataKey="verificationOrigin" name="Verification Origins" fill={chartConfig.verificationOrigin.color} /> */}
                </BarChart>
                </ChartContainer>
            </CardContent>

    </Card>
  );
};


export default YearlyStatisticsbyOriginChart;