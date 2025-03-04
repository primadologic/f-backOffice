import { CaseStatusType } from "@/common/Type/CaseFile/CaseStatus.type"

export const CaseStatusData: CaseStatusType[] = [
    {
        statusId: "2e73c398-b060-4da8-99b8-9a97b1134ba9",
        name: "opened",
        description: "New Case Opened"
    },
   {
        statusId: "5f40a416-88f0-4377-9606-0be472f6eb71",
        name: "investigation",
        description: "Under Investigation"
    },
   {
        statusId: "146f4b8b-dbbb-4760-a394-7b06bbfa6b32",
        name: "review",
        description: "Under Review"
    }, 
   {
        statusId: "779eb6b3-c501-408e-9d3c-970e341ab91a",
        name: "approved",
        description: "Case Approved"
    },
   {
        statusId: "8dcb6d04-821b-4e7a-88d3-ce7f59162966",
        name: "closed",
        description: "Case Closed"
    },
   {
        statusId: "b4f862d8-cb96-4154-b831-62ca5d6d1195",
        name: "archived",
        description: "Case Archived"
    },

]