import { ReportNumberType } from '@/data/ReportNumbers/ReportNumbers.type'
import { create } from 'zustand'



interface ReportNumberStore {
  isOpen: boolean
  selectedReportNumber: ReportNumberType | null
  setIsOpen: (isOpen: boolean) => void
  setSelectedReportNumber: (reportNumber: ReportNumberType | null) => void
  reset: () => void
}

export const useReportNumberStore = create<ReportNumberStore>((set) => ({
  isOpen: false,
  selectedReportNumber: null,
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedReportNumber: (reportNumberId) => set({ selectedReportNumber: reportNumberId }),
  reset: () => set({ isOpen: false, selectedReportNumber: null })
}))