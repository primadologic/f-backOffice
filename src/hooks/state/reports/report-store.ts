import { ReportList } from '@/data/ReportNumbers/ReportNumbers.type'
import { create } from 'zustand'



interface ReportNumberStore {
  isOpen: boolean
  selectedReportNumber: ReportList | null
  setIsOpen: (isOpen: boolean) => void
  setSelectedReportNumber: (reportNumber: ReportList | null) => void
//   updateStatus: (statusId: string) => void
  reset: () => void
}

export const useReportNumberStore = create<ReportNumberStore>((set) => ({
  isOpen: false,
  selectedReportNumber: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedReportNumber: (reportNumber) => set({ selectedReportNumber: reportNumber }),
//   updateStatus: (statusId) => set((state) => ({
//     selectedCaseFile: state.selectedCaseFile ? {
//       ...state.selectedCaseFile,
//       status: CaseStatusData.find(s => s.statusId === statusId) || state.selectedCaseFile.status
//     } : null
//   })),
  reset: () => set({ isOpen: false, selectedReportNumber: null })
}))