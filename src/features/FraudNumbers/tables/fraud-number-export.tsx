import { useQuery } from "@tanstack/react-query";


import TableExport from "@/components/custom-ui/table-export";
import { getData } from "@/service/fraudNumberService";

// For Fraud Numbers Table
export const FraudNumberExport = () => {
    const { data } = useQuery({
      queryKey: ['fraudNumberList'],
      queryFn: getData
    });
  
    const fraudNumberColumns = [
      {
        label: 'Fraud Number ID',
        value: 'fraudNumberId'
      },
      {
        label: 'Fraud Number',
        value: 'fraudNumber'
      },
      {
        label: 'Visibility',
        value: 'visibility',
        transform: (value: boolean) => value ? 'Yes' : 'No'
      },
      {
        label: 'Reported',
        value: 'reported',
        transform: (value: boolean) => value ? 'Yes' : 'No'
      },
      {
        label: 'Investigated',
        value: 'investigated',
        transform: (value: boolean) => value ? 'Yes' : 'No'
      },
      {
        label: 'Approved',
        value: 'approved',
        transform: (value: boolean) => value ? 'Yes' : 'No'
      },
      {
        label: 'Risk Level',
        value: 'riskLevel.displayName'
      },
      {
        label: 'Report Count',
        value: 'riskLevel.reportCount'
      }
    ];
  
    return (
      <div className="container mx-auto">
        <TableExport 
          data={data || []} 
          columns={fraudNumberColumns}
          filename="fraud-numbers-export"
        />
        {/* Rest of your table */}
      </div>
    );
  };
  