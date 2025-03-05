import { ReportNumberType } from "@/common/Type/ReportNumbers/ReportNumbers.type";



export async function getData(): Promise<ReportNumberType[]> {
    // Fetch data from your API here.
    return [
      {
        reportId: "1",
        reporterNumber: "024 000 0000",
        suspectNumber: "053 000 0000",
        incidentDate: "2025-01-05",
        reportPlatForm: {
          id: "1",
          name: "whatsapp",
          displayName: "WhatsApp"
        },
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nemo laboriosam aspernatur magni provident repudiandae maiores reiciendis fugiat voluptatem minima!",
        archived: false,
        createdAt: "2025-01-05"
      },
      {
        reportId: "2",
        reporterNumber: "024 200 2000",
        suspectNumber: "053 200 2000",
        incidentDate: "2025-01-06",
        reportPlatForm: {
          id: "2",
          name: "instagram",
          displayName: "Instagram"
        },
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nemo laboriosam aspernatur magni provident repudiandae maiores reiciendis fugiat voluptatem minima!",
        archived: false,
        createdAt: "2025-01-06"
      },
      {
        reportId: "3",
        reporterNumber: "024 300 3000",
        suspectNumber: "053 300 3000",
        incidentDate: "2025-01-07",
        reportPlatForm: {
          id: "3",
          name: "x",
          displayName: "X (Twitter)"
        },
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nemo laboriosam aspernatur magni provident repudiandae maiores reiciendis fugiat voluptatem minima!",
        archived: false,
        createdAt: "2025-01-08"
      },
      {
        reportId: "4",
        reporterNumber: "024 400 4000",
        suspectNumber: "053 400 4000",
        incidentDate: "2025-01-07",
        reportPlatForm: {
          id: "4",
          name: "phone_call",
          displayName: "Phone Call"
        },
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nemo laboriosam aspernatur magni provident repudiandae maiores reiciendis fugiat voluptatem minima!",
        archived: false,
        createdAt: "2025-01-07"
      },
      {
        reportId: "5",
        reporterNumber: "024 500 5000",
        suspectNumber: "053 400 4000",
        incidentDate: "2025-01-09",
        reportPlatForm: {
          id: "5",
          name: "phone_call",
          displayName: "Phone Call"
        },
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nemo laboriosam aspernatur magni provident repudiandae maiores reiciendis fugiat voluptatem minima!",
        archived: true,
        createdAt: "2025-01-09"
      },
      {
        reportId: "6",
        reporterNumber: "024 600 6000",
        suspectNumber: "053 600 6000",
        incidentDate: "2025-01-10",
        reportPlatForm: {
          id: "6",
          name: "sms",
          displayName: "SMS"
        },
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nemo laboriosam aspernatur magni provident repudiandae maiores reiciendis fugiat voluptatem minima!",
        archived: false,
        createdAt: "2025-01-10"
      },
      {
        reportId: "7",
        reporterNumber: "024 700 7000",
        suspectNumber: "053 700 7000",
        incidentDate: "2025-01-11",
        reportPlatForm: {
          id: "6",
          name: "sms",
          displayName: "SMS"
        },
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nemo laboriosam aspernatur magni provident repudiandae maiores reiciendis fugiat voluptatem minima!",
        archived: false,
        createdAt: "2025-01-11"
      },
  
      // ...
    ]
  }