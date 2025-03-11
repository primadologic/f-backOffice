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