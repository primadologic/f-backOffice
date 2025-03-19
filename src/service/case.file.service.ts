// src/services/caseFileService.ts
import { CaseFileType } from "@/common/Type/CaseFile/CaseFile.type"


export async function getData(): Promise<CaseFileType[]> {
  return [
    {
      caseId: '1',
      suspectNumber: '0241002000',
      investigator: {
        userId: "1",
        email: "example@gmail.com",
        firstName: "Daizy"
      },
      remark: 'Hello FraudWall',
      status: {
        statusId: "1",
        name: "opened",
        description: ""
      }
    },
    {
      caseId: '1',
      suspectNumber: '0201002000',
      investigator: {
        userId: "2",
        email: "example@gmail.com",
        firstName: "john"
      },
      remark: 'Hello FraudWall',
      status: {
        statusId: "2",
        name: "investigation",
        description: ""
      }
    },
    {
      caseId: "3",
      suspectNumber: '0201002000',
      investigator: {
        userId: "3",
        email: "example@gmail.com",
        firstName: "Samuel"
      },
      remark: 'Hello user 3',
      status: {
        statusId: "3",
        name: "review",
        description: ""
      }
    },
    {
      caseId: "4",
      suspectNumber: '0531002000',
      investigator: {
        userId: "4",
        email: "example@gmail.com",
        firstName: "Michael"
      },
      remark: 'Hello user 3',
      status: {
        statusId: "5",
        name: "approved",
        description: ""
      }
    },
    {
      caseId: "5",
      suspectNumber: '0531002000',
      investigator: {
        userId: "5",
        email: "example@gmail.com",
        firstName: "Nathaniel"
      },
      remark: 'Hello user 3',
      status: {
        statusId: "5",
        name: "closed",
        description: ""
      }
    },
    {
      caseId: "6",
      suspectNumber: '0531002000',
      investigator: {
        userId: "6",
        email: "example@gmail.com",
        firstName: "Nathaniel"
      },
      remark: 'Hello user 3',
      status: {
        statusId: "6",
        name: "archived",
        description: ""
      }
    },
    {
      caseId: "7",
      suspectNumber: '0531002000',
      investigator: {
        userId: "7",
        email: "example@gmail.com",
        firstName: "Yaw"
      },
      remark: 'Hello user 4',
      status: {
        statusId: "7",
        name: "closed",
        description: ""
      }
    },
  ]
}
