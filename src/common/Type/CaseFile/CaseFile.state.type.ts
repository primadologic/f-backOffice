


export type CaseFileStore = {
  selectedCaseFileId: string | null;
  openSheet: (caseId: string) => void;
  closeSheet: () => void;
};