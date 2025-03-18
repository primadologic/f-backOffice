import { ReportNumberPlatformType } from "../ReportNumbers/report-number";

export type FraudNumberType = {
    fraudNumberId: string;
    fraudNumber: string;
    visibility: boolean;
    reported: boolean;
    investigated: boolean;
    approved: boolean;
    riskLevel?: RiskLevelType | null;
    createdAt?: Date;
  };
  
  export type RiskLevelType = {
    id: string;
    name: string;
    reportCount: number;
    displayName: string;
    description: string;
  };
  
  export type CreateFraudNumberType = {
    suspectNumber: string;
    reported: boolean;
    approved: boolean;
    investigated: boolean;
    visibility: boolean
  }



  
 export type FraudNumberNewType = {
    fraudNumberId: string;
    fraudNumber: string;
    visibility: boolean;
    reported: boolean;
    investigated: boolean;
    approved: boolean;
    score: number;
    modifiedAt: string;
    createdAt?: string;
    riskLevel?: RiskLevel;
}

  export  type RiskLevel = {
    dateCreated: string;
    dateUpdated: string;
    dateDeleted: string | null;
    id: string;
    name: string;
    reportCount: number;
    displayName: string;
    description: string;
  }


export type FraudNumberGetType = {
  fraudNumberId: string;
  fraudNumber: string;
  visibility: boolean;
  reported: boolean;
  investigated: boolean;
  approved: boolean;
  score: number;
  modifiedAt: string;
  createdAt?: string;
  riskLevel?: RiskLevel;
  reports?: ReportNumberPlatformType[]
}