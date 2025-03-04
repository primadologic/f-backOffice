
import { useQuery } from "@tanstack/react-query";

import TableExport from "@/components/custom-ui/table-export";
import { getData } from "@/service/caseFileService";

// Your existing getData function...

export default function CaseFileExport() {
  const getCaseFiles = useQuery({
    queryKey: ['caseFilesList'],
    queryFn: async () => {
      return await getData();
    }
  });

  const caseFileColumns = [
    {
      label: 'Case ID',
      value: 'caseId'
    },
    {
      label: 'Suspect Number',
      value: 'suspectNumber'
    },
    {
      label: 'Investigator Name',
      value: 'investigator.firstName'
    },
    {
      label: 'Investigator Email',
      value: 'investigator.email'
    },
    {
      label: 'Remark',
      value: 'remark'
    },
    {
      label: 'Status',
      value: 'status.name',
      transform: (value: string) => value.charAt(0).toUpperCase() + value.slice(1)
    }
  ];

  return (
    <div className="container mx-auto ">
      <div className="">
        <TableExport 
          data={getCaseFiles.data || []}
          columns={caseFileColumns}
          filename="case-files-export"
        />
      </div>
    </div>
  );
}