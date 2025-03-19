import { FraudNumberType } from "@/common/Type/FraudNumber/fraud-numbers";



export async function getData(): Promise<FraudNumberType[]> {
    // Fetch data from your API here.
    return [
      {
        fraudNumberId: "1",
        fraudNumber: "024 000 0000",
        visibility: true,
        reported: true,
        investigated: true,
        approved: true,
        riskLevel: {
          id: "1",
          name: "low",
          reportCount: 3,
          displayName: "Low Risk",
          description: "Low risk level"
        }
      },
      {
        fraudNumberId: "2",
        fraudNumber: "024 100 1000",
        visibility: false,
        reported: false,
        investigated: false,
        approved: false,
        riskLevel: {
          id: "2",
          name: "low",
          reportCount: 3,
          displayName: "Low Risk",
          description: "Low risk level"
        }
      },
      {
        fraudNumberId: "3",
        fraudNumber: "024 200 2000",
        visibility: true,
        reported: true,
        investigated: true,
        approved: true,
        riskLevel: {
          id: "3",
          name: "medium",
          reportCount: 3,
          displayName: "Low Risk",
          description: "Low risk level"
        }
      },
      {
        fraudNumberId: "4",
        fraudNumber: "024 300 3000",
        visibility: false,
        reported: false,
        investigated: false,
        approved: false,
        riskLevel: {
          id: "4",
          name: "medium",
          reportCount: 3,
          displayName: "Low Risk",
          description: "Low risk level"
        }
      },
      {
        fraudNumberId: "5",
        fraudNumber: "024 400 4000",
        visibility: true,
        reported: true,
        investigated: true,
        approved: true,
        riskLevel: {
          id: "5",
          name: "medium",
          reportCount: 3,
          displayName: "Low Risk",
          description: "Low risk level"
        }
      },
      {
        fraudNumberId: "6",
        fraudNumber: "024 500 5000",
        visibility: false,
        reported: false,
        investigated: false,
        approved: false,
        riskLevel: {
          id: "6",
          name: "high",
          reportCount: 3,
          displayName: "Low Risk",
          description: "Low risk level"
        }
      },
      {
        fraudNumberId: "7",
        fraudNumber: "024 6   00 6000",
        visibility: false,
        reported: false,
        investigated: false,
        approved: false,
        riskLevel: {
          id: "7",
          name: "high",
          reportCount: 3,
          displayName: "Low Risk",
          description: "Low risk level"
        }
      },
      
      // ...
    ]
  }