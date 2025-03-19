
export type ReportNumberType = {
    reportId?: string;
    reporterNumber: string;
    suspectNumber: string;
    incidentDate: string;
    reportPlatForm: ReportNumberPlatformType | null;
    description: string;
    reportFiles?: File[] | string[] | [] ;
    createdAt?: string;
    archived: boolean
  };
  
  export type ReportNumberPlatformType = {
    id: string;
    name: string;
    displayName: string;
    description?: string;
    dateCreated?: string,
    dateUpdated?: string,
    dateDeleted?: string
  };
  
  export type ReportThresholdType = {
    id: string;
    reportCount: string;
    name: string;
    description: string;
  };
  

  export type CreateReportNumberType = {
    reporterNumber: string;
    suspectNumber: string;
    incidentDate: string;
    platFormId: string;
    description: string;
    requestFiles?: File[] 
  }


  export interface ReportList {
    reportId?: string;
    reporterNumber: string;
    suspectNumber: string;
    incidentDate: string;
    reportPlatForm: ReportNumberPlatformType | null;
    description: string;
    reportFiles?: string[] | [];
    createdAt?: string;
    archived: boolean
    reportPlatform: ReportNumberPlatformType
  }