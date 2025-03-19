

import { ApiResponse } from "@/common/api-response.type";
import TableExport from "@/components/custom-ui/table-export";
import { useCaseFileListService } from "@/service/case-files/service";


// Your existing getData function...

export default function CaseFileExport() {
  // const getCaseFiles = useQuery({
  //   queryKey: ['caseFilesList'],
  //   queryFn: async () => {
  //     return await getData();
  //   }
  // });

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
      label: 'Investigator Id',
      value: 'investigator.userId'
    },
    {
      label: 'Investigator First Name',
      value: 'investigator.firstName'
    },
    {
      label: 'Investigator Last Name',
      value: 'investigator.lastName'
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
      label: 'Modified At',
      value: 'modifiedAt'
    },
    {
      label: 'Created At',
      value: 'createdAt'
    },
    {
      label: 'Status',
      value: 'status.name',
      transform: (value: string | null) =>
        value ? value.charAt(0).toUpperCase() + value.slice(1) : "N/A"
    },
    {
      label: 'Status Date Deleted',
      value: 'status.dateDeleted',
      transform: (value: string | null) =>
        value ? value.charAt(0).toUpperCase() + value.slice(1) : "N/A"
    },
    {
      label: 'Description',
      value: 'status.description'
    },
  ];


  const response: ApiResponse = useCaseFileListService()?.data

  const caseFile = response?.data || []

  return (
    <div className="container mx-auto ">
      <div className="">
        <TableExport 
          data={caseFile || []}
          columns={caseFileColumns}
          filename="case-files-export"
        />
      </div>
    </div>
  );
}