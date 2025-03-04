

export type ModelNameDistributionType = {
    date: string;
    fraudCount: number;
    reportCount: number;
}

export type VerifybyOriginType = {
  date: string,
  origin: string,
  Fraud: number
}

export type TotalVerificationbyOriginType = {
  origin: string,
  fraud: number,
  fill: string
}


export const ModelNameDistributionChartData: ModelNameDistributionType[] = [

    {
        date: "2025-01-12",
        fraudCount: 15,
        reportCount: 7
      },
      {
        date: "2025-01-13",
        fraudCount: 18,
        reportCount: 9
      },
      {
        date: "2025-01-14",
        fraudCount: 20,
        reportCount: 12
      },
      {
        date: "2025-01-15",
        fraudCount: 22,
        reportCount: 10
      },
      {
        date: "2025-01-16",
        fraudCount: 17,
        reportCount: 8
      },
      {
        date: "2025-01-17",
        fraudCount: 14,
        reportCount: 5
      },
      {
        date: "2025-01-18",
        fraudCount: 19,
        reportCount: 6
      },
      {
        date: "2025-01-19",
        fraudCount: 21,
        reportCount: 11
      },
      {
        date: "2025-01-20",
        fraudCount: 24,
        reportCount: 13
      },
      {
        date: "2025-01-21",
        fraudCount: 16,
        reportCount: 9
      },
      {
        date: "2025-01-22",
        fraudCount: 12,
        reportCount: 4
      },
      {
        date: "2025-01-23",
        fraudCount: 13,
        reportCount: 5
      },
      {
        date: "2025-01-24",
        fraudCount: 25,
        reportCount: 14
      },
      {
        date: "2025-01-25",
        fraudCount: 30,
        reportCount: 15
      },
      {
        date: "2025-01-26",
        fraudCount: 28,
        reportCount: 16
      },
      {
        date: "2025-01-27",
        fraudCount: 26,
        reportCount: 12
      },
      {
        date: "2025-01-28",
        fraudCount: 22,
        reportCount: 11
      },
      {
        date: "2025-01-29",
        fraudCount: 21,
        reportCount: 9
      },
      {
        date: "2025-01-30",
        fraudCount: 19,
        reportCount: 8
      },
      {
        date: "2025-01-31",
        fraudCount: 23,
        reportCount: 10
      },
      {
        date: "2025-02-01",
        fraudCount: 27,
        reportCount: 13
      },
      {
        date: "2025-02-02",
        fraudCount: 29,
        reportCount: 14
      },
      {
        date: "2025-02-03",
        fraudCount: 31,
        reportCount: 17
      },
      {
        date: "2025-02-04",
        fraudCount: 20,
        reportCount: 10
      },
      {
        date: "2025-02-05",
        fraudCount: 18,
        reportCount: 8
      },
      {
        date: "2025-02-06",
        fraudCount: 16,
        reportCount: 7
      },
      {
        date: "2025-02-07",
        fraudCount: 14,
        reportCount: 6
      },
      {
        date: "2025-02-08",
        fraudCount: 12,
        reportCount: 5
      },
      {
        date: "2025-02-09",
        fraudCount: 10,
        reportCount: 4
      },
      {
        date: "2025-02-10",
        fraudCount: 9,
        reportCount: 3
      }

]


export const VerifybyOriginChartData: VerifybyOriginType[] = [
  { date: "2025-01-12", origin: "Web", Fraud: 3 },
  { date: "2025-01-13", origin: "USSD", Fraud: 1 },
  { date: "2025-01-14", origin: "Telegram", Fraud: 5 },
  { date: "2025-01-15", origin: "Web", Fraud: 2 },
  { date: "2025-01-16", origin: "USSD", Fraud: 4 },
  { date: "2025-01-17", origin: "Telegram", Fraud: 6 },
  { date: "2025-01-18", origin: "Web", Fraud: 7 },
  { date: "2025-01-19", origin: "USSD", Fraud: 3 },
  { date: "2025-01-20", origin: "Telegram", Fraud: 8 },
  { date: "2025-01-21", origin: "Web", Fraud: 5 },
  { date: "2025-01-22", origin: "USSD", Fraud: 2 },
  { date: "2025-01-23", origin: "Telegram", Fraud: 7 },
  { date: "2025-01-24", origin: "Web", Fraud: 4 },
  { date: "2025-01-25", origin: "USSD", Fraud: 5 },
  { date: "2025-01-26", origin: "Telegram", Fraud: 9 },
  { date: "2025-01-27", origin: "Web", Fraud: 6 },
  { date: "2025-01-28", origin: "USSD", Fraud: 3 },
  { date: "2025-01-29", origin: "Telegram", Fraud: 10 },
  { date: "2025-01-30", origin: "Web", Fraud: 8 },
  { date: "2025-01-31", origin: "USSD", Fraud: 4 },
  { date: "2025-02-01", origin: "Telegram", Fraud: 11 },
  { date: "2025-02-02", origin: "Web", Fraud: 5 },
  { date: "2025-02-03", origin: "USSD", Fraud: 6 },
  { date: "2025-02-04", origin: "Telegram", Fraud: 12 },
  { date: "2025-02-05", origin: "Web", Fraud: 9 },
  { date: "2025-02-06", origin: "USSD", Fraud: 3 },
  { date: "2025-02-07", origin: "Telegram", Fraud: 10 },
  { date: "2025-02-08", origin: "Web", Fraud: 7 },
  { date: "2025-02-09", origin: "USSD", Fraud: 4 },
  { date: "2025-02-10", origin: "Telegram", Fraud: 13 }
]


export const TotalVerificationbyOriginData: TotalVerificationbyOriginType[]  = [
  { origin: "Web", fraud: 275, fill: "var(--color-Web)" },
  { origin: "Telegram", fraud: 200, fill: "var(--color-Telegram)"},
  { origin: "USSD", fraud: 187, fill: "var(--color-USSD)"},
];
