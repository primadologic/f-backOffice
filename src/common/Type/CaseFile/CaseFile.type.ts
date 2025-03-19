import { UserDetailType, } from "@/common/Type/user.type"
import { ReportNumberType } from "../ReportNumbers/report-number";

  export type CaseFileType = {
    caseId: string;
    suspectNumber: string;
    remark: string;
    status?: CaseFileStatusType;
    investigator?: UserDetailType
    comments?: CommentType[];
    createdAt?: string;
    reports?: ReportNumberType[]
  }


  export type CaseFileStatusType = {
    statusId: any;
    name?: string;
    description?: string;
  }


  export type CommentType = {
    commentId: string;
    user: UserDetailType,
    caseFile: CaseFileType,
    notes: string;
    dateCreated: Date
  }


  export type UpdateCaseFileType = {
    statusId: string;
    remark: string;
  }

  export type NewCaseFileType = {
    suspectNumber: string;
    statusId: string;
    remark: string;
  };


  export type EditCaseFileType = {
    statusId: string;
    remark: string;
  }


  export type AssignInvestigatorType = {
    investigatorId: string
  }

