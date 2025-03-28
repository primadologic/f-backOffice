import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Skeleton } from "@/components/ui/skeleton";
  import { useStatReportDashboard } from "@/service/analytics/stats-report-dash.service";
  
  // Images (Ensure these are correctly imported for TypeScript)
  import blue_graph from "/assets/illustrations/blue-graph.png";
  import organge_graph from "/assets/illustrations/orange-graph.png";
  import red_graph from "/assets/illustrations/red-graph.png";
import { useRouterState } from "@tanstack/react-router";
  
  // Define the type for the report stats data
  interface ReportStats {
    totalReports?: number;
    totalReporters?: number;
    totalReportedFraudNumbers?: number;
    totalCaseFiles?: number;
    totalVisibleFraudNumbers?: number;
    totalInvestigatedFraudNumbers?: number;
    totalApprovedFraudNumbers?: number;
    totalOriginsFromWeb?: number;
    totalOriginsFromUSSD?: number;
    totalOriginsFromTelegram?: number;
  }
  
  // Define the type for the stat card data
  interface StatCard {
    key: keyof ReportStats;
    title: string;
    image: string;
  }
  
  export default function NewOverviewCards() {
    const getReportDashStats = useStatReportDashboard();
    const reportStats: ReportStats = getReportDashStats.data?.data ?? {};
    const isLoading: boolean = getReportDashStats.isLoading;

    const { status } = useRouterState() ;
      
 
    const statCards: StatCard[] = [
      { key: "totalReports", title: "Total Reports", image: organge_graph },
      { key: "totalReporters", title: "Total Reporters", image: organge_graph },
      { key: "totalReportedFraudNumbers", title: "Total Reported Numbers", image: organge_graph },
      { key: "totalCaseFiles", title: "Total Case Files", image: organge_graph },
      { key: "totalVisibleFraudNumbers", title: "Total Visible Fraud Numbers", image: red_graph },
      { key: "totalInvestigatedFraudNumbers", title: "Total Investigated Fraud Numbers", image: red_graph },
      { key: "totalApprovedFraudNumbers", title: "Total Approved Fraud Numbers", image: red_graph },
      { key: "totalOriginsFromWeb", title: "Total Origins from Web", image: blue_graph },
      { key: "totalOriginsFromUSSD", title: "Total Origins from USSD", image: blue_graph },
      { key: "totalOriginsFromTelegram", title: "Total Origins from Telegram", image: blue_graph },
    ];
  
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ key, title, image }) => (
            <Card key={key} className="w-full">
              <CardHeader>
              {isLoading || status === "pending" ? (
                 <Skeleton className="h-6 w-24" />
                
              ): (
                <CardTitle className="text-sm">{title}</CardTitle>
              )}
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                {isLoading || status === "pending" ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <data value={reportStats[key] ?? 0} className="text-2xl font-bold">
                    {reportStats[key] ?? 0}
                  </data>
                )}
              </CardContent>
              <CardFooter className="w-full flex flex-row items-end justify-end">
                {isLoading ? (
                  <Skeleton className="h-12 w-24" />
                ) : (
                  <img
                    src={image}
                    alt="Graph"
                    className="object-contain "
                  />
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }