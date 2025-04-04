
// import { useQuery } from "@tanstack/react-query";

import { ApiResponse } from "@/common/api-response.type";
import TableExport from "@/components/custom-ui/table-export";
// import { getData } from "@/service/report-number.service";
import { useReportListService } from "@/service/report/service";



// Your existing getData function...

export default function ReportNumberExport() {


  const response: ApiResponse = useReportListService()?.data

  const report = response?.data || []


  const reportNumberColumns = [
    {
      label: 'Report ID',
      value: 'reportId'
    },
    {
      label: 'Reporter Number',
      value: 'reporterNumber'
    },
    {
      label: 'Suspect Number',
      value: 'suspectNumber'
    },
    {
      label: 'Incident Date',
      value: 'incidentDate',
      transform: (value: string) => new Date(value)?.toLocaleDateString()
    },
    {
      label: 'Platform',
      value: 'reportPlatForm.displayName'
    },
    {
      label: 'Description',
      value: 'description'
    },
    {
      label: 'Archived',
      value: 'archived',
      transform: (value: boolean) => value ? 'Archived' : 'Active'
    },
    {
      label: 'Created At',
      value: 'createdAt',
      transform: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  return (
    <div className="container mx-auto ">
      <div className="">
        <TableExport 
          data={report || []}
          columns={reportNumberColumns}
          filename="report-numbers-export"
        />
      </div>
    </div>
  );
}