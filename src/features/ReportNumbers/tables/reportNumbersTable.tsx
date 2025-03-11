// import { useQuery } from "@tanstack/react-query"
import { columns } from "./columns"
import { DataTable } from "./data-table"
// import { getData } from "@/service/report-number.service";
import { useReportListService } from "@/service/report/list.sevice";



export type ApiResponse = {
  statusCode: number;
  message: string;
  data?: any;
  error?: string;
};



export default function ReportNumberListTable() {

  // const getCaseFiles = useQuery({
  //     queryKey: ['reportNumberList'],
  //     queryFn: async () => {
  //        return await getData();
  //     }
       
  // })

  const response: ApiResponse = useReportListService()?.data

  const report = response?.data || []


  return (
    <div className="container mx-auto ">
      {/* <DataTable columns={columns} data={getCaseFiles.data || []} /> */}
      <DataTable columns={columns} data={report|| []} />
    </div>
  )
}
