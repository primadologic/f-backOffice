
import { useQuery } from "@tanstack/react-query";
import { getData } from './reportNumbersTable';
import TableExport from "@/components/CustomUI/table-export";

// Your existing getData function...

export default function ReportNumberExport() {
  const getCaseFiles = useQuery({
    queryKey: ['reportNumberList'],
    queryFn: async () => {
      return await getData();
    }
  });

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
      transform: (value: string) => new Date(value).toLocaleDateString()
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
      label: 'Status',
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
    <div className="container mx-auto py-10">
      <div className="">
        <TableExport 
          data={getCaseFiles.data || []}
          columns={reportNumberColumns}
          filename="report-numbers-export"
        />
      </div>
    </div>
  );
}